import { createProduct, updateProduct, deleteProduct } from "./service.js";
export default {
    Mutation: {
        createProduct: async (parent, args, context) => {
            const result = await createProduct(args.data);
            if (result?.error)
                throw result?.error;
            return result;
        },
        updateProduct: async (parent, args, context) => {
            const result = await updateProduct(args.data);
            if (result?.error)
                throw result?.error;
            return result;
        },
        deleteProduct: async (parent, args, context) => {
            const result = await deleteProduct(args.id);
            if (result?.error)
                throw result?.error;
            return true;
        },
    },
};
