import { GraphQLScalarType, Kind } from "graphql";

export default new GraphQLScalarType({
    name: "Json",
    description: "A custom scalar that accepts any valid Json value",

    // Serialize the value as a Json string before send to the client
    serialize(value: any) {
        try {
            return value;
            // return JSON.stringify(value);
        } catch (error) {
            throw new Error(`Json serialization error: ${error.message}`);
        }
    },

    // Parse the value from variables (client input)
    parseValue(value: any) {
        if (typeof value === "object" || typeof value === "string" || typeof value === "number" || typeof value === "boolean" || value === null) {
            return value;
        }
        throw new Error(`Json can only accept valid Json values, received: ${typeof value}`);
    },

    // Parse the value from a literal (hardcoded in the query)          
    parseLiteral(ast) {
        switch (ast.kind) {
            case Kind.OBJECT:
                return parseObject(ast);
            case Kind.LIST:
                return ast.values.map(parseLiteralValue);
            case Kind.STRING:
            case Kind.BOOLEAN:
                return ast.value;
            case Kind.INT:
            case Kind.FLOAT:
                return parseFloat(ast.value);
            case Kind.NULL:
                return null;
            default:
                throw new Error(`Json scalar can only parse valid Json literals, received: ${ast.kind}`);
        }
    },
});

// Helper to parse object AST
function parseObject(ast) {
    const value = {};
    ast.fields.forEach((field) => {
        value[field.name.value] = parseLiteralValue(field.value);
    });
    return value;
}

// Helper to parse individual literal values
function parseLiteralValue(valueNode) {
    switch (valueNode.kind) {
        case Kind.OBJECT:
            return parseObject(valueNode);
        case Kind.LIST:
            return valueNode.values.map(parseLiteralValue);
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value;
        case Kind.INT:
        case Kind.FLOAT:
            return parseFloat(valueNode.value);
        case Kind.NULL:
            return null;
        default:
            throw new Error(`Invalid AST value kind: ${valueNode.kind}`);
    }
}
