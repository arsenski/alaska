const { sequelize } = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

// Связи
User.hasOne(Cart, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

Cart.hasMany(CartItem, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

CartItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ alter: true, force });
    console.log(`Database synced (force: ${force})`);
  } catch (error) {
    console.error('Database sync error:', error.message);
  }
};

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  syncDatabase
};