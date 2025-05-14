import { GraphQLError } from "graphql";
import { env } from "./index.js";

export default (err: GraphQLError) => {
    // Log the error
    console.error(err);


    // Return error object
    return {
        status: "error",
        message: err.message,
    };
};
