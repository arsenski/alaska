const express = require('express');
const {
  getAllProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByPriceRange,
  getInStockProducts
} = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Обычные маршруты / без мидлвара
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/in-stock', getInStockProducts);
router.get('/price-range', getProductsByPriceRange);
router.get('/id/:id', getProductById);
router.get('/slug/:slug', getProductBySlug);

// Админские маршруты / мидлвар проверяет на админскость
router.post('/', createProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;