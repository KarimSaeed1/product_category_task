import { GraphQLScalarType, Kind } from "graphql";

export default new GraphQLScalarType({
    name: "Decimal",
    description: "A custom scalar that handles decimal values as numbers",

    // Serialize the Decimal value to a number before sending to the client
    serialize(value: any) {
        // Invalid Decimal
        if (isNaN(Number(value))) throw new Error(`Decimal serialization error: Value is not a valid decimal: ${value}`);

        // Valid Decimal
        return Number(value);
    },

    // Parse the value from variables (client input)
    parseValue(value: any) {
        // Invalid Decimal
        if (isNaN(Number(value))) throw new Error(`Decimal parsing error: Invalid decimal format: ${value}`);

        // Valid Decimal
        return value.toString();
    },

    // Parse the value from a literal (hardcoded in the query)
    parseLiteral(ast) {
        if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT || ast.kind === Kind.STRING) {
            if (!isNaN(Number(ast.value))) return ast.value.toString();
        }

        throw new Error(`Decimal scalar can only parse string, int, or float literals, received: ${ast.kind}`);
    },
});
