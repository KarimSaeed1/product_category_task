import { prisma } from "../../../config/index.js";
import { error } from "../../../utils/index.js";
export const getCategory = async (id) => {
    // Checks
    const error = await prisma.Category.checks(prisma, { id });
    if (error)
        return error;
    // Get Category
    return await prisma.Category.findUnique({ where: { id }, ...prisma.Category.selectArgsHelper() });
};
export const getCategories = async (params) => {
    // Get all Category
    return await prisma.$getMany(prisma, "Category", params);
};
export const createCategory = async ({ ...data }) => {
    // Checks
    const error = await prisma.Category.checks(prisma, { ...data });
    if (error)
        return error;
    return await prisma.Category.create({ data: { ...data }, ...prisma.Category.selectArgsHelper() });
};
export const updateCategory = async ({ id, ...data }) => {
    // Checks
    const error = await prisma.Category.checks(prisma, { id, ...data });
    if (error)
        return error;
    return await prisma.Category.update({ where: { id }, data: { ...data }, ...prisma.Category.selectArgsHelper() });
};
export const deleteCategory = async (id) => {
    // Checks
    const errorFound = await prisma.Category.checks(prisma, { id });
    if (errorFound)
        return errorFound;
    const category = await prisma.Category.findUnique({ where: { id }, include: { products: true } });
    if (category?.products.length) {
        // Prevent deletion if any products reference this category
        return error(`Cannot delete category ${id}: ${category?.products.length || 0} item(s) are using it`, `لا يمكن حذف التصنيف ${id}: توجد ${category?.products.length || 0} مادة/مواد مرتبطة بها`);
    }
    await prisma.Category.delete({ where: { id } });
    return true;
};
