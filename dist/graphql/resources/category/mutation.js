import { createCategory, updateCategory, deleteCategory } from "./service.js";
export default {
    Mutation: {
        createCategory: async (parent, args, context) => {
            const result = await createCategory(args.data);
            if (result?.error)
                throw result?.error;
            return result;
        },
        updateCategory: async (parent, args, context) => {
            const result = await updateCategory(args.data);
            if (result?.error)
                throw result?.error;
            return result;
        },
        deleteCategory: async (parent, args, context) => {
            const result = await deleteCategory(args.id);
            if (result?.error)
                throw result?.error;
            return true;
        },
    },
};
