export default {
    async requestDidStart(requestContext) {
        // Get req
        const { req } = requestContext.contextValue;

        // Don't include Introspection in logging,
        if (req["graphql"]?.name !== "IntrospectionQuery") {
        }

        return {
            async willSendResponse(responseContext) {
                const { req, res } = responseContext.contextValue;

                if (req["graphql"]?.name !== "IntrospectionQuery") {
                }
            },
        };
    },
};
