import { GraphQLScalarType, Kind } from "graphql";
export default new GraphQLScalarType({
    name: "DateTime",
    description: "A custom scalar that handles ISO 8601 DateTime strings",
    // Serialize the Date object to an ISO 8601 string before sending to the client
    serialize(value) {
        // Check if the value is a Date object
        if (value instanceof Date) {
            // Return the ISO 8601 string
            return value.toISOString();
        }
        // Throw an error if the value is not a Date object
        throw new Error(`DateTime serialization error: Value is not a valid Date object: ${value}`);
    },
    // Parse the value from variables (client input)
    parseValue(value) {
        // Check if the value is a string
        if (typeof value === "string" || value instanceof String) {
            // Check if the string is a valid ISO 8601 string
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                // Throw an error if the string is not a valid ISO 8601 string
                throw new Error(`DateTime parsing error: Invalid ISO 8601 string: ${value}`);
            }
            // Converts ISO 8601 string to Date
            return date;
        }
        // Throw an error if the value is not a string
        throw new Error(`DateTime can only parse ISO 8601 strings, received: ${typeof value}`);
    },
    // Parse the value from a literal (hardcoded in the query)
    parseLiteral(ast) {
        // Check if the literal is a string
        if (ast.kind === Kind.STRING) {
            // Create new date from the value
            const date = new Date(ast.value);
            // Check if the created date is a valid ISO 8601 string
            if (isNaN(date.getTime())) {
                // Throw an error if the string is not a valid ISO 8601 string
                throw new Error(`DateTime parsing error: Invalid ISO 8601 string: ${ast.value}`);
            }
            // Converts ISO 8601 string to Date
            return date;
        }
        // Throw an error if the literal is not a string
        throw new Error(`DateTime scalar can only parse string literals, received: ${ast.kind}`);
    },
});
