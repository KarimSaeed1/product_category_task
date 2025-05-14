import { getCategories, getCategory } from "./service.js";

export default {
    Query: {
        category: async (parent, args, context) => {
            const result: any = await getCategory(args.id);
            if (result?.error) throw result?.error;
            return result;
        },
        categories: async (parent, args, context) => {
            const result: any = await getCategories(args.params);
            if (result?.error) throw result?.error;
            return result;
        },
    },
};
