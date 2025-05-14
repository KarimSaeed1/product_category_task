import { getProducts, getProduct } from "./service.js";

export default {
    Query: {
        product: async (parent, args, context) => {
            const result: any = await getProduct(args.id);
            if (result?.error) throw result?.error;
            return result;
        },
        products: async (parent, args, context) => {
            const result: any = await getProducts(args.params);
            if (result?.error) throw result?.error;
            return result;
        },
    },
};
