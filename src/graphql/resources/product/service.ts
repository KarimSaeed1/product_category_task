import { prisma } from "../../../config/index.js";
import { error } from "../../../utils/index.js";

export const getProduct = async (id) => {
    // Checks
    const error = await prisma.Product.checks(prisma, { id });
    if (error) return error;

    // Get Product
    return await prisma.Product.findUnique({ where: { id }, ...prisma.Product.selectArgsHelper() });
};

export const getProducts= async (params) => {
    // Get all Products
    return await prisma.$getMany(prisma, "Product", params);
};

export const createProduct = async ({category_id , ...data }) => {

    // Checks
    const error = await prisma.Product.checks(prisma, { ...data });
    if (error) return error;

    return await prisma.Product.create({ data: { ...data , ...(category_id && { category: { connect: { id: category_id } } }) }, ...prisma.Product.selectArgsHelper() });
};

export const updateProduct = async ({id, category_id, ...data }) => {

    // Checks
    const error = await prisma.Product.checks(prisma, { id, ...data });
    if (error) return error;

    return await prisma.Product.update({ where: { id }, data: { ...data , ...(category_id && { category: { connect: { id: category_id } } })}, ...prisma.Product.selectArgsHelper() });
};

export const deleteProduct = async (id) => {
    // Checks
    const errorFound = await prisma.Product.checks(prisma, { id });
    if (errorFound) return errorFound;
    

    await prisma.Product.delete({ where: { id } });

    return true;
};
