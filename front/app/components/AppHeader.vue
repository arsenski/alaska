<template>
  <header style="background: white; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 50;">
    <div style="max-width: 1280px; margin: 0 auto; padding: 0 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; height: 64px;">
        <NuxtLink to="/" style="font-size: 1.5rem; font-weight: bold; color: #1f2937;">
          Аляска ГазСтрой
        </NuxtLink>

        <nav style="display: none; gap: 2rem; align-items: center;">
          <NuxtLink to="/" style="color: #4b5563; text-decoration: none;">Главная</NuxtLink>
          <NuxtLink to="/catalog" style="color: #4b5563; text-decoration: none;">Каталог</NuxtLink>
          <NuxtLink to="/contacts" style="color: #4b5563; text-decoration: none;">Контакты</NuxtLink>
          <NuxtLink v-if="isAdmin" to="/admin" style="color: #4b5563; text-decoration: none;">Админка</NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/profile" style="color: #4b5563; text-decoration: none;">Профиль</NuxtLink>
          <NuxtLink to="/chat" class="text-gray-700 hover:text-green-600">Чат</NuxtLink>
        </nav>

        <div style="display: flex; gap: 1rem; align-items: center;">
          <NuxtLink to="/cart" style="position: relative; color: #4b5563; text-decoration: none;">
            Корзина
            <span v-if="cartCount > 0" style="position: absolute; top: -8px; right: -12px; background: #dc2626; color: white; font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: 50%;">
              {{ cartCount }}
            </span>
          </NuxtLink>
          
          <button v-if="isAuthenticated" @click="logout" style="color: #dc2626; background: none; border: none; cursor: pointer;">
            Выйти
          </button>
          
          <NuxtLink v-else to="/login">
            <button style="background: #16a34a; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer;">
              Войти
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalCount);

const isAdmin = ref(false);
const isAuthenticated = ref(false);

const checkAuth = () => {
  if (import.meta.client) {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    isAuthenticated.value = !!token;
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        isAdmin.value = user.isAdmin === true;
      } catch (e) {}
    }
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  isAuthenticated.value = false;
  isAdmin.value = false;
  navigateTo('/');
};

onMounted(() => {
  checkAuth();
  cartStore.fetchCart();
  window.addEventListener('auth-change', checkAuth);
});

onUnmounted(() => {
  window.removeEventListener('auth-change', checkAuth);
});
</script>

<style scoped>
@media (min-width: 768px) {
  nav {
    display: flex !important;
  }
}
</style>