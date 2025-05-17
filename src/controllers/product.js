const prisma = require("../services/prisma_client")


// GET
exports.getAll = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });
    
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true
      }
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(`Error fetching product with ID ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    // Validate that category exists
    const category = await prisma.category.findUnique({
      where: { id: Number(categoryId) }
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category with ID ${categoryId} not found`
      });
    }
    
    const products = await prisma.product.findMany({
      where: { categoryId: Number(categoryId) },
      include: {
        category: true
      }
    });
    
    return res.status(200).json({
      success: true,
      count: products.length,
      category: category.name,
      data: products
    });
  } catch (error) {
    console.error(`Error fetching products with category ID ${req.params.categoryId}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products by category',
      error: error.message
    });
  }
};


// POST
exports.create = async (req, res) => {
  try {
    const { name, description, price, stock, category_id } = req.body;
    
    // Validate input
    if (!name || price === undefined || !category_id) {
      return res.status(400).json({
        success: false,
        message: 'Product name, price, and category id are required'
      });
    }
    
    // Check if price is valid
    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a positive number'
      });
    }
    
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: Number(category_id) }
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category with ID ${category_id} not found`
      });
    }
    
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: stock ? Number(stock) : 0,
        ...(category_id && { category: { connect: { id: Number(category_id) } } })
      }
    });
    
    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
};


// PATCH
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock,category_id } = req.body;
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`
      });
    }
    
    // If category_id is provided, check if category exists
    if (category_id) {
      const category = await prisma.category.findUnique({
        where: { id: Number(category_id) }
      });
      
      if (!category) {
        return res.status(404).json({
          success: false,
          message: `Category with ID ${category_id} not found`
        });
      }
    }
    
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name || product.name,
        description: description !== undefined ? description : product.description,
        price: price !== undefined ? Number(price) : product.price,
        stock: stock !== undefined ? Number(stock) : product.stock,
        ...(category_id && { category: { connect: { id: Number(category_id) } } })
      }
    });
    
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error) {
    console.error(`Error updating product with ID ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
};


// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${id} not found`
      });
    }
    
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    
    return res.status(200).json({
      success: true,
      message: `Product with ID ${id} deleted successfully`
    });
  } catch (error) {
    console.error(`Error deleting product with ID ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};