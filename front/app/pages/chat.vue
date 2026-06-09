<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Карточка чата -->
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-green-100">
        <!-- Хедер -->
        <div class="bg-gradient-to-r from-green-700 to-emerald-600 text-white p-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur">
              💬
            </div>
            <div>
              <h1 class="text-2xl font-bold">Аляска ГазСтрой</h1>
              <p class="text-sm text-green-100 mt-0.5">Ответим на вопросы о товарах и услугах</p>
            </div>
          </div>
        </div>
        
        <!-- Сообщения -->
        <div class="h-[600px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          <div v-for="m in messages" :key="m.id" class="flex" :class="m.role === 'user' ? 'justify-end' : 'justify-start'">
            <div :class="m.role === 'user' 
              ? 'bg-green-600 text-white rounded-2xl rounded-br-md shadow-md' 
              : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'" 
              class="px-5 py-3 max-w-[80%]">
              <div class="text-base leading-relaxed whitespace-pre-wrap break-words">{{ m.content }}</div>
            </div>
          </div>
          <div v-if="loading" class="flex justify-start">
            <div class="bg-white text-gray-500 rounded-2xl rounded-bl-md px-5 py-3 shadow-sm border border-gray-100">
              <div class="flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                <span class="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                <span class="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                <span class="text-sm ml-1">Печатает...</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Инпут -->
        <div class="border-t border-gray-100 p-5 bg-white">
          <textarea 
            v-model="text" 
            @keyup.enter.prevent="send" 
            placeholder="Напишите ваш вопрос..."
            rows="4"
            class="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-700 placeholder-gray-400 resize-none"
          />
          <div class="flex justify-end mt-3">
            <button @click="send" class="bg-green-600 text-white px-8 py-2.5 rounded-xl hover:bg-green-700 transition-all shadow-md hover:shadow-lg font-medium">
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const text = ref('')
const messages = ref([{ 
  id: 1, 
  role: 'bot', 
  content: 'Здравствуйте! Компания "Аляска ГазСтрой".\n\nРасскажем о товарах, ценах, наличии и доставке.\n\nЗадайте вопрос, мы поможем.' 
}])

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
    messages.value.push({ id: Date.now() + 1, role: 'bot', content: data.reply || 'Не удалось обработать запрос. Попробуйте перефразировать.' })
  } catch (err) {
    console.error(err)
    messages.value.push({ id: Date.now() + 1, role: 'bot', content: 'Ошибка соединения. Попробуйте позже.' })
  }
  loading.value = false
}
</script>