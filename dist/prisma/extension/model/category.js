import { error } from "../../../utils/index.js";
export default {
    columns: {
        strings: ["name", "description"],
        dates: ['createdAt', 'updatedAt'],
        numbers: ["id"],
    },
    selectArgsHelper: function (selectArgs) {
        // Default Select Args
        const AllArgs = {
            include: {
                products: true,
            },
        };
        // Return either the included args or the default args
        return selectArgs ? selectArgs : AllArgs;
    },
    checks: async (prisma, { ...data }) => {
        // Check main data
        if (!data)
            return error("category.body_required");
        // Check main instance
        const category = data.id ? await prisma.Category.findUnique({ where: { id: data.id }, select: { id: true } }) : null;
        if (!category && data.id)
            return error("category.not_found");
        // No errors
        return null;
    },
};
