import { error } from "../../../utils/index.js";

export default {
    columns: {
        strings: ["name"],
        dates: ["createdAt", "updatedAt"],
        numbers: ["id","price", "category_id"],
    },
    selectArgsHelper: function (selectArgs?) {
        // Default Select Args
        const AllArgs = {
            include: {
                category: true,
            },
        };
        // Return either the included args or the default args
        return selectArgs ? selectArgs : AllArgs;
    },
    checks: async (prisma, {...data }) => {

        // Check main data
        if (!data) return error("product.body_required");

        // Check main instance
        const product = data.id ? await prisma.Product.findUnique({ where: { id: data.id }, select: { id: true } }) : null;
        if (!product && data.id) return error("product.not_found");

        // Check category
        const category = data.category_id ? await prisma.Category.findUnique({ where: { id: data.category_id }, select: { id: true } }) : null;
        if (!category && data.category_id) return error("category.not_found");

        // No errors
        return null;
    },
};
