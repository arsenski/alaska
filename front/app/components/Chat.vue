<template>
  <div class="fixed bottom-5 right-5 z-50">
    <button @click="open = !open" class="bg-green-600 text-white p-3 rounded-full shadow-lg text-2xl w-14 h-14">
      💬
    </button>
    
    <div v-if="open" class="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
      <div class="bg-green-600 text-white p-3 rounded-t-lg font-bold">
        Аляска Помощник
      </div>
      
      <div class="flex-1 p-3 overflow-auto space-y-2">
        <div v-for="m in messages" :key="m.id" :class="m.role === 'user' ? 'text-right text-blue-600' : 'text-left text-gray-700'">
          {{ m.content }}
        </div>
        <div v-if="loading" class="text-left text-gray-400">Печатает...</div>
      </div>
      
      <div class="flex p-2 border-t">
        <input 
          v-model="text" 
          @keyup.enter="send" 
          placeholder="Спроси..." 
          class="flex-1 p-2 border rounded-l"
        />
        <button @click="send" class="bg-green-600 text-white px-4 rounded-r">
          ➤
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const open = ref(false)
const loading = ref(false)
const text = ref('')
const messages = ref([{ id: 1, role: 'bot', content: 'Чем помочь?' }])

const send = async () => {
  if (!text.value.trim()) return
  const q = text.value
  messages.value.push({ id: Date.now(), role: 'user', content: q })
  text.value = ''
  loading.value = true

  try {
    const res = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: q })
    })
    const data = await res.json()
    messages.value.push({ id: Date.now() + 1, role: 'bot', content: data.reply || 'Ошибка' })
  } catch {
    messages.value.push({ id: Date.now() + 1, role: 'bot', content: '❌ Ошибка' })
  }
  loading.value = false
}
</script>