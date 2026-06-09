<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex gap-4 mb-6 border-b">
        <button 
          @click="isLogin = true" 
          :class="['pb-2 px-1', isLogin ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400']"
        >
          Вход
        </button>
        <button 
          @click="isLogin = false" 
          :class="['pb-2 px-1', !isLogin ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400']"
        >
          Регистрация
        </button>
      </div>

      <form v-if="isLogin" @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="loginForm.email" type="email" class="w-full px-3 py-2 border rounded-lg" required>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input v-model="loginForm.password" type="password" class="w-full px-3 py-2 border rounded-lg" required>
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Войти
        </button>
      </form>

      <form v-else @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="registerForm.email" type="email" class="w-full px-3 py-2 border rounded-lg" required>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
          <input v-model="registerForm.password" type="password" class="w-full px-3 py-2 border rounded-lg" required>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
          <input v-model="registerForm.fullName" class="w-full px-3 py-2 border rounded-lg" required>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
          <input v-model="registerForm.phone" class="w-full px-3 py-2 border rounded-lg">
        </div>
        <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
const isLogin = ref(true)
const loginForm = reactive({ email: '', password: '' })
const registerForm = reactive({ email: '', password: '', fullName: '', phone: '' })

const handleLogin = () => {
  console.log('Login:', loginForm)
}

const handleRegister = () => {
  console.log('Register:', registerForm)
}
</script>