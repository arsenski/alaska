<template>
  <div style="max-width: 400px; margin: 0 auto; padding: 3rem 1rem;">
    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 2rem;">
      <h2 style="font-size: 1.5rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem;">Вход</h2>
      
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <input v-model="password" type="password" placeholder="Пароль" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <button type="submit" style="width: 100%; background: #16a34a; color: white; padding: 0.75rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: bold;">
          Войти
        </button>
      </form>
      
      <p style="text-align: center; margin-top: 1rem; font-size: 0.875rem;">
        Нет аккаунта? 
        <NuxtLink to="/register" style="color: #16a34a;">Зарегистрироваться</NuxtLink>
      </p>
      
      <p v-if="error" style="color: #dc2626; text-align: center; margin-top: 1rem;">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';

const { post } = useApi();
const cartStore = useCartStore();
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  error.value = '';
  try {
    const data = await post('/auth/login', { email: email.value, password: password.value });
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      await cartStore.fetchCart();
      
      window.dispatchEvent(new Event('auth-change'));
      
      navigateTo('/');
    } else {
      error.value = data.error || 'Ошибка входа';
    }
  } catch (err) {
    error.value = 'Ошибка соединения';
  }
};
</script>