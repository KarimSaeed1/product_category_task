export default {
    $sort: function (columns, sort?) {
        // Constants
        const SEPERATOR = ",";
        const DEFAULT_ORDER = { created_at: "desc" };

        // Ensure sort is provided and includes a comma (to get column and order)
        if (!sort || !sort.includes(SEPERATOR)) return DEFAULT_ORDER;

        // Get column and order from the sort string
        let [column, order] = sort.split(SEPERATOR);

        // Ensure both column and order are present after split
        if (!column || !order) return DEFAULT_ORDER;

        // Normalize order to lowercase for consistent checking
        order = order.toLowerCase();

        // Validate column and order
        const isColumnAllowed = Object.keys(columns).some((key) => columns[key].includes(column));
        const isOrderAllowed = ["asc", "desc"].includes(order);

        // Return default if validation fails, otherwise return sort object
        if (!isColumnAllowed || !isOrderAllowed) return DEFAULT_ORDER;

        // Return the constructed sort object
        return { [column]: order };
    },
};
