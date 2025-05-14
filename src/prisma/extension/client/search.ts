export default {
    $search(columns, search?) {
        // Make sure search is provided
        if (!search || !columns.strings.length || !columns.numbers.length) return [];

        // Trim search spaces from both sides
        search = search.trim();

        // Declare the OR Array
        let OR = [];

        // Iterate over all entity columns
        Object.keys(columns).map((key) => {
            switch (key) {
                // STRINGS SEARCH
                case "strings":
                    columns[key].forEach((column) => {
                        OR.push({ [column]: { contains: search, mode: "insensitive" } });
                    });
                    break;
                // NUMBERS SEARCH
                case "numbers":
                    columns[key].forEach((column) => {
                        if (!isNaN(Number(search)) && search.length < 10) OR.push({ [column]: { equals: Number(search) } });
                    });
                    break;
                // DATE SEARCH
                case "dates":
                    const dateValue = new Date(!isNaN(Number(search)) ? Number(search) : search);
                    if (dateValue && !isNaN(dateValue.getTime())) {
                        // Check if it's a valid date
                        columns[key].forEach((column) => {
                            OR.push({
                                [column]: {
                                    gte: new Date(dateValue.setHours(0, 0, 0, 0)),
                                    lte: new Date(dateValue.setHours(23, 59, 59, 999)),
                                },
                            });
                        });
                    }
                    break;
                // BOOLEAN SEARCH
                case "booleans":
                    if (search.toLowerCase() === "true") {
                        columns[key].forEach((column) => {
                            OR.push({ [column]: { equals: true } });
                        });
                    } else if (search.toLowerCase() === "false") {
                        columns[key].forEach((column) => {
                            OR.push({ [column]: { equals: false } });
                        });
                    }
                    break;
            }
        });
        return OR;
    },
};
