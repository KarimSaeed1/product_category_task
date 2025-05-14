import { env, formatError } from "./config/index.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import graphql from "./graphql/index.js";
import { graphqlUploadExpress } from "graphql-upload-ts";
import plugins from "./graphql/plugins/index.js";
export default async (app) => {
    // Create Apollo server
    const server = new ApolloServer({
        ...graphql,
        csrfPrevention: true,
        plugins: [...plugins],
        formatError,
        introspection: env.NODE_ENV !== "production",
    });
    // Start the Apollo server
    await server.start();
    // Get all mutation and queries names  => ([...Object.keys(graphql.resolvers["Query"]), ...Object.keys(graphql.resolvers["Mutation"])]);
    // Define Graphql Endpoint & Express Middleware for GraphQL & Define Context (Request & Response)
    app.use(`/${env.GRAPHQL_PATH}`, graphqlUploadExpress(), expressMiddleware(server, {
        context: async ({ req, res }) => ({ req, res }),
    }));
};
