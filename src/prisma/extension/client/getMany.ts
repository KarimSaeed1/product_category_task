export default {
    async $getMany(prisma, model, params: any = {}, selectArgs?) {
        // Adjustable Arguments
        selectArgs = prisma[model].selectArgsHelper ? prisma[model].selectArgsHelper(selectArgs) : selectArgs || {};

        const page = params?.page ? params?.page - 1 : 0;
        const size = params?.size ? params?.size : 100000;
        let skip = page * size;
        let AND = [];

        // Assign Parameters
        const orderBy = prisma.$sort(prisma[model].columns, params?.sort);
        const filterResult = prisma.$filter(prisma[model].columns, params?.filter);
        const searchResult = prisma.$search(prisma[model].columns, params?.search);

        // Add filters
        if (filterResult.length) AND.push(...filterResult);
        // Add search
        if (searchResult.length) AND.push({ OR: [...searchResult] });
        // Condition
        const where = { where: { ...(AND.length > 0 && { AND }) } };

        // Find Many
        const data: any = await prisma[model].findMany({
            ...where,
            ...selectArgs,
            orderBy,
            skip,
            take: size,
        });

        const total = await prisma[model].count({ ...where });

        // Return
        return {
            data,
            total: total || 0,
            maxDepth: prisma[model].maxDepth ? await prisma[model].maxDepth(prisma[model]) : 0,
            page: page + 1,
            totalPages: Math.ceil(total / size) || 0,
            size,
        };
    },
};
