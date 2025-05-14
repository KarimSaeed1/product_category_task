import { error } from "./index.js";

export default async (query, data, columns, id?, where?) => {
    // Evaluate OR according to incoming 'data' and specified 'columns'
    const OR = columns
        .map((column) => {
            return data[column] ? { [column]: data[column] } : null;
        })
        .filter((d) => d !== null);

    // Use findMany to check for duplicates
    const items = await query.findMany({ where: { ...(id && { id: { not: id } }), ...(OR.length > 0 && { OR }), ...(where && { ...where }) } });

    // Check if any duplication exists
    if (items.length > 0) {
        // Duplications Container
        let duplicated = new Set();

        // Push any duplication to duplicated array
        items.forEach((item) => {
            Object.keys(data).forEach((key) => {
                if (data[key] === item[key] && columns.includes(key)) {
                    duplicated.add(key);
                }
            });
        });
        // Return error response
        if (Array.from(duplicated).length) return error(`${Array.from(duplicated)} already exist`, `القيم موجودة مسبقا ${Array.from(duplicated)}`);
    }

    return null;
};
