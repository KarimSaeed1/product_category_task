import { loadFiles } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import customScalars from "./customScalars/index.js";

// Load all GraphQL types and merge
const typeDefs = mergeTypeDefs(await loadFiles("./**/types.graphql"));

// Load all GraphQL resolvers and merge => (dynamic import) because ES Module doesn't support require()
const resolvers = mergeResolvers(await loadFiles("./**/resolver.js", { requireMethod: async (path) => (await import(`file://${path}`)).default }));

// Export GraphQL resources
export default { typeDefs, resolvers: { ...resolvers, ...customScalars } };
