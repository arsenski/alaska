const jwt = require('jsonwebtoken')
const { User } = require('../models')

const JWT_SECRET = 'your_secret_key_change_me'

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  
  console.log('Получен токен:', token ? 'есть' : 'нет')
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('Декодировано:', decoded)
    
    const user = await User.findByPk(decoded.id)
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    
    req.user = user
    next()
  } catch (err) {
    console.error('Ошибка верификации токена:', err.message)
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ error: 'Admin required' })
  }
  next()
}

module.exports = { authMiddleware, adminMiddleware }