<template>
  <div style="max-width: 400px; margin: 0 auto; padding: 3rem 1rem;">
    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 2rem;">
      <h2 style="font-size: 1.5rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem;">Регистрация</h2>
      
      <form @submit.prevent="handleRegister">
        <input v-model="form.email" type="email" placeholder="Email" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <input v-model="form.password" type="password" placeholder="Пароль" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <input v-model="form.fullName" type="text" placeholder="ФИО" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <input v-model="form.phone" type="tel" placeholder="Телефон" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        
        <button type="submit" style="width: 100%; background: #16a34a; color: white; padding: 0.75rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: bold;">
          Зарегистрироваться
        </button>
      </form>
      
      <p style="text-align: center; margin-top: 1rem; font-size: 0.875rem;">
        Уже есть аккаунт? 
        <NuxtLink to="/login" style="color: #16a34a;">Войти</NuxtLink>
      </p>
      
      <p v-if="error" style="color: #dc2626; text-align: center; margin-top: 1rem;">{{ error }}</p>
      <p v-if="success" style="color: #16a34a; text-align: center; margin-top: 1rem;">{{ success }}</p>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';

const { post } = useApi();
const cartStore = useCartStore();

const form = reactive({
  email: '',
  password: '',
  fullName: '',
  phone: ''
});

const error = ref('');
const success = ref('');

const handleRegister = async () => {
  error.value = '';
  success.value = '';
  
  try {
    const data = await post('/auth/register', form);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      await cartStore.fetchCart();
      
      window.dispatchEvent(new Event('auth-change'));
      
      success.value = 'Регистрация успешна! Перенаправление...';
      
      setTimeout(() => {
        navigateTo('/');
      }, 1500);
    } else {
      error.value = data.error || 'Ошибка регистрации';
    }
  } catch (err) {
    error.value = 'Ошибка соединения с сервером';
  }
};
</script>