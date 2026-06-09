const express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

const router = express.Router()
const JWT_SECRET = 'your_secret_key_change_me'

// Получить всех пользователей (админ панель)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'full_name', 'phone', 'is_admin'],
      order: [['id', 'ASC']]
    })
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Получить свой профиль
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'full_name', 'phone', 'address', 'avatar', 'is_admin']
    })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Обновление профиля
router.put('/profile', authMiddleware, async (req, res) => {
  const { fullName, phone, address, avatar } = req.body
  
  try {
    await User.update(
      { full_name: fullName, phone, address, avatar },
      { where: { id: req.user.id } }
    )
    
    res.json({ message: 'Профиль обновлён' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router