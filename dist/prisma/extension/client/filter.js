export default {
    $filter(col, filters) {
        // Define Constants
        const SEGMENT_SEPARATOR = "&";
        const OR_SEPARATOR = ",";
        // Null Handler
        const nullHandler = { null: null, "!null": { not: null } };
        return filters
            ? filters
                .split(SEGMENT_SEPARATOR)
                // Get first segment
                .map((filter) => {
                // Extract column/values
                let [column, ...values] = filter.split(OR_SEPARATOR);
                // Remove falsy values
                values = values.filter(Boolean);
                // Make sure it contains column/values are exist
                if (!column || !values.length)
                    return null;
                // Trim spaces from both sides
                column = column.trim();
                values = values.map((value) => value.trim());
                return {
                    OR: values
                        // Iterate over all values
                        .map((value) => {
                        // In case null value provided for relations
                        if (col.relations.includes(column) && value === 'null') {
                            return {
                                [column]: {
                                    none: {}
                                }
                            };
                        }
                        // In case null value provided for other fields
                        if (nullHandler.hasOwnProperty(value))
                            return { [column]: nullHandler[value] };
                        switch (true) {
                            // STRINGS
                            case col.strings.includes(column):
                                return { [column]: { contains: value, mode: "insensitive" } };
                            // NUMBERS
                            case col.numbers.includes(column):
                                return !isNaN(Number(value)) ? { [column]: { equals: Number(value) } } : null;
                            // BOOLEANS
                            case col.booleans.includes(column):
                                return { [column]: { equals: value === "true" } };
                            // DATES
                            case col.dates.includes(column): {
                                const date = new Date(!isNaN(Number(value)) ? Number(value) : value);
                                return !isNaN(date.getTime()) ? { [column]: { gte: new Date(date.setHours(0, 0, 0, 0)), lte: new Date(date.setHours(23, 59, 59, 999)) } } : null;
                            }
                            // RELATIONS
                            case col.relations.includes(column): {
                                const numericValue = Number(value);
                                return !isNaN(numericValue) ? {
                                    [column]: {
                                        some: {
                                            id: numericValue
                                        }
                                    }
                                } : null;
                            }
                            // DEFAULT
                            default:
                                return null;
                        }
                    })
                        .filter(Boolean),
                };
            })
                .filter(Boolean)
            : [];
    },
};
