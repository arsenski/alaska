const express = require('express');
const { Cart, CartItem, Product } = require('../models');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Получить корзину текущего пользователя
router.get('/', authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ where: { user_id: req.user.id } });
    
    if (!cart) {
      cart = await Cart.create({ user_id: req.user.id });
    }
    
    const items = await CartItem.findAll({
      where: { cart_id: cart.id },
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'image_url', 'in_stock']
      }]
    });
    
    res.json(items);
  } catch (err) {
    console.error('Ошибка получения корзины:', err);
    res.status(500).json({ error: err.message });
  }
});

// Добавить товар в корзину
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Не указан ID товара' });
    }
    
    // Проверяем существование товара
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    
    // Находим или создаём корзину пользователя
    let cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) {
      cart = await Cart.create({ user_id: req.user.id });
    }
    
    // Находим или создаём позицию в корзине
    let cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id: productId }
    });
    
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cart_id: cart.id,
        product_id: productId,
        quantity
      });
    }
    
    res.json({ message: 'Товар добавлен в корзину', item: cartItem });
  } catch (err) {
    console.error('Ошибка добавления в корзину:', err);
    res.status(500).json({ error: err.message });
  }
});

// Обновить количество товара в корзине
router.put('/update/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    
    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ error: 'Некорректное количество' });
    }
    
    const cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) {
      return res.status(404).json({ error: 'Корзина не найдена' });
    }
    
    const cartItem = await CartItem.findOne({
      where: { cart_id: cart.id, product_id: productId }
    });
    
    if (!cartItem) {
      return res.status(404).json({ error: 'Товар не найден в корзине' });
    }
    
    if (quantity <= 0) {
      await cartItem.destroy();
      res.json({ message: 'Товар удалён из корзины' });
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
      res.json({ message: 'Количество обновлено', item: cartItem });
    }
  } catch (err) {
    console.error('Ошибка обновления корзины:', err);
    res.status(500).json({ error: err.message });
  }
});

// Удалить товар из корзины
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (!cart) {
      return res.status(404).json({ error: 'Корзина не найдена' });
    }
    
    const deleted = await CartItem.destroy({
      where: { cart_id: cart.id, product_id: productId }
    });
    
    if (deleted) {
      res.json({ message: 'Товар удалён из корзины' });
    } else {
      res.status(404).json({ error: 'Товар не найден в корзине' });
    }
  } catch (err) {
    console.error('Ошибка удаления из корзины:', err);
    res.status(500).json({ error: err.message });
  }
});

// Очистить всю корзину
router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { user_id: req.user.id } });
    if (cart) {
      await CartItem.destroy({ where: { cart_id: cart.id } });
    }
    res.json({ message: 'Корзина очищена' });
  } catch (err) {
    console.error('Ошибка очистки корзины:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;