import { parse, visit, Kind } from "graphql";
import { env } from "../config/index.js";

export default async (req, res, next) => {
    try {
        if (req.path !== `/${env.GRAPHQL_PATH}`) return next();

        const { query, variables } = req.body; // Extract query and variables

        // If content-type is multipart, parse form-data
        if (req.is("multipart/form-data")) {
            req.graphql = { queries: [], name: null, type: null };
            req.graphql.queries.push(req.headers["x-apollo-operation-name"]);
            req.graphql.name = req.headers["x-apollo-operation-name"];
            req.graphql.type = "multipart/form-data";
        }

        // Parse the GraphQL AST if query is available
        const ast = query ? parse(query) : null;

        if (ast) {
            // Initialize the graphql object
            req.graphql = { queries: [], name: null, type: null, args: {} };

            // Extract Infos
            visit(ast, {
                [Kind.OPERATION_DEFINITION](node) {
                    // Extract the operation name, if it exists
                    req.graphql.name = node.name ? node.name.value : null;
                    // Extract the operation type
                    req.graphql.type = node.operation;
                    // Ensure selectionSet is defined and contains selections
                    if (node.selectionSet && node.selectionSet.selections) {
                        // Extract the field (query) names
                        node.selectionSet.selections.forEach((selection) => {
                            // Make sure it's a field
                            if (selection.kind === Kind.FIELD) {
                                req.graphql.queries.push(selection.name.value);

                                // Extract arguments for the field
                                selection.arguments.forEach((arg) => {
                                    if (arg.value.kind === Kind.VARIABLE) {
                                        // Resolve variable from req.body.variables
                                        const variableName = arg.value.name.value;
                                        req.graphql[arg.name.value] = variables[variableName];
                                    } else {
                                        // Handle inline values
                                        req.graphql[arg.name.value] = extractValue(arg.value);
                                    }
                                });
                            }
                        });
                    }
                },
            });

            // Limit num of queries per request
            if (req.graphql.queries.length > 1) {
                return res.status(400).json({
                    status: "error",
                    message: "Only one query per request allowed!",
                });
            }
        }

        next();
    } catch (err) {
        next(err);
    }
};

function extractValue(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
        case Kind.INT:
        case Kind.FLOAT:
            return valueNode.value;
        case Kind.ENUM:
            return valueNode.value;
        case Kind.OBJECT:
            const obj = {};
            valueNode.fields.forEach((field) => {
                obj[field.name.value] = extractValue(field.value);
            });
            return obj;
        case Kind.LIST:
            return valueNode.values.map((val) => extractValue(val));
        default:
            return null;
    }
}
