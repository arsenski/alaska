const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models')

const router = express.Router()
const JWT_SECRET = 'your_secret_key_change_me'

router.post('/register', async (req, res) => {
  const { email, password, fullName, phone } = req.body
  
  try {
    const user = await User.create({
      email,
      password_hash: password,
      full_name: fullName,
      phone,
      is_admin: false
    })
    
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.is_admin }, 
      JWT_SECRET, 
      { expiresIn: '100d' }
    )
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.full_name, 
        isAdmin: user.is_admin 
      } 
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await User.findOne({ where: { email } })
    
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }
    
    const valid = await user.comparePassword(password)
    if (!valid) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.is_admin }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    )
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.full_name, 
        isAdmin: user.is_admin 
      } 
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

module.exports = router