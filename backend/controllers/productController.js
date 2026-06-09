const { Product } = require('../models');
const { Op } = require('sequelize');

// Получить все товары
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['created_at', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Получить один товар по ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Получить товар по slug
const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug }
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Создать товар
const createProduct = async (req, res) => {
  try {
    const { name, slug, description, price, imageUrl, inStock } = req.body;
    
    const product = await Product.create({
      name,
      slug,
      description: description || '',
      price,
      image_url: imageUrl || '',
      in_stock: inStock !== undefined ? inStock : true
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Обновить товар
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const { name, slug, description, price, image_url, imageUrl, in_stock, inStock } = req.body;
    
    // Принимаем оба варианта названий полей
    const finalImageUrl = image_url || imageUrl;
    const finalInStock = in_stock !== undefined ? in_stock : (inStock !== undefined ? inStock : product.in_stock);
    
    await product.update({
      name: name !== undefined ? name : product.name,
      slug: slug !== undefined ? slug : product.slug,
      description: description !== undefined ? description : product.description,
      price: price !== undefined ? price : product.price,
      image_url: finalImageUrl !== undefined ? finalImageUrl : product.image_url,
      in_stock: finalInStock !== undefined ? finalInStock : product.in_stock
    });
    
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Ошибка обновления:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Удалить товар
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

// Поиск товаров
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } }
        ]
      }
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error: error.message });
  }
};

// Поиск по цене
const getProductsByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;
    const where = {};
    
    if (min) where.price = { [Op.gte]: parseFloat(min) };
    if (max) where.price = { ...where.price, [Op.lte]: parseFloat(max) };
    
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by price', error: error.message });
  }
};

// Только в наличии
const getInStockProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { in_stock: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching in-stock products', error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByPriceRange,
  getInStockProducts
};