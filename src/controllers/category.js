const prisma = require("../services/prisma_client")

// GET
exports.getAll = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });
    
    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: {
        products: true
      }
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category with ID ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error(`Error fetching category with ID ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
      error: error.message
    });
  }
};

// POST
exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Validate input
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }
    
    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: { name }
    });
    
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: `Category "${name}" already exists`
      });
    }
    
    const newCategory = await prisma.category.create({
      data: {
        name,
        description
      }
    });
    
    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create category',
      error: error.message
    });
  }
};

// PATCH
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    // Validate input
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }
    
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: Number(id) }
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category with ID ${id} not found`
      });
    }
    
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
        description
      }
    });
    
    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });
  } catch (error) {
    console.error(`Error updating category with ID ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update category',
      error: error.message
    });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: {
        products: true
      }
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category with ID ${id} not found`
      });
    }
    
    // Check if category has products
    if (category.products.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ID ${id} because it has associated products`,
        productCount: category.products.length
      });
    }
    
    await prisma.category.delete({
      where: { id: Number(id) }
    });
    
    return res.status(200).json({
      success: true,
      message: `Category with ID ${id} deleted successfully`
    });
  } catch (error) {
    console.error(`Error deleting category with ID ${req.params.id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete category',
      error: error.message
    });
  }
};