import getMany from "./getMany.js";
import sort from "./sort.js";
import filter from "./filter.js";
import search from "./search.js";

export default {
    ...getMany,
    ...sort,
    ...filter,
    ...search,
};
