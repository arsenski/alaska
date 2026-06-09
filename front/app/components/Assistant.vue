<template>
  <div class="chat-bot">
    <button @click="isOpen = !isOpen" class="chat-toggle">💬</button>
    
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <span>🤖 Аляска ГазСтрой — Помощник</span>
        <button @click="isOpen = false">✕</button>
      </div>
      
      <div class="chat-messages">
        <div v-for="msg in messages" :key="msg.id" :class="['message', msg.role]">
          {{ msg.content }}
        </div>
        <div v-if="loading" class="message bot">Печатает...</div>
      </div>
      
      <div class="chat-input">
        <input 
          v-model="inputMessage" 
          @keyup.enter="sendMessage"
          placeholder="Спросите о товарах..."
        />
        <button @click="sendMessage" :disabled="loading">📤</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const loading = ref(false)
const inputMessage = ref('')

const messages = ref([
  { id: 1, role: 'bot', content: 'Здравствуйте! Чем могу помочь? 😊' }
])

const sendMessage = async () => {
  if (!inputMessage.value.trim() || loading.value) return
  
  const question = inputMessage.value
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: question
  })
  inputMessage.value = ''
  loading.value = true
  
  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question })
    })
    const data = await response.json()
    
    messages.value.push({
      id: Date.now() + 1,
      role: 'bot',
      content: data.reply || 'Не удалось получить ответ'
    })
  } catch (error) {
    console.error('Chat error:', error)
    messages.value.push({
      id: Date.now() + 1,
      role: 'bot',
      content: '❌ Ошибка. Проверьте бэкенд на порту 5000'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.chat-bot { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
.chat-toggle { width: 56px; height: 56px; border-radius: 50%; background: #16a34a; border: none; font-size: 28px; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.2); }
.chat-window { position: absolute; bottom: 70px; right: 0; width: 350px; height: 450px; background: white; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden; }
.chat-header { display: flex; justify-content: space-between; padding: 12px 16px; background: #16a34a; color: white; font-weight: bold; }
.chat-header button { background: none; border: none; color: white; font-size: 20px; cursor: pointer; }
.chat-messages { flex: 1; padding: 12px; overflow-y: auto; background: #f9fafb; display: flex; flex-direction: column; }
.message { margin-bottom: 8px; padding: 8px 12px; border-radius: 12px; max-width: 85%; word-wrap: break-word; }
.message.user { background: #2563eb; color: white; align-self: flex-end; }
.message.bot { background: #e5e7eb; color: #1f2937; align-self: flex-start; }
.chat-input { display: flex; padding: 12px; border-top: 1px solid #e5e7eb; background: white; }
.chat-input input { flex: 1; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 20px; outline: none; }
.chat-input button { margin-left: 8px; background: #16a34a; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; }
.chat-input button:disabled { opacity: 0.5; }
</style>
