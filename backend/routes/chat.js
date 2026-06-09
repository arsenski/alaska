const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'Нет сообщения' })

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:1b',
        prompt: message,
        stream: false
      })
    })
    const data = await response.json()
    res.json({ reply: data.response })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Ошибка Ollama' })
  }
})

module.exports = router