<template>
  <div style="max-width: 1280px; margin: 0 auto; padding: 2rem 1rem;">
    <h1 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 2rem;">Каталог товаров</h1>

    <div v-if="loading" style="text-align: center; padding: 3rem; color: #6b7280;">
      Загрузка товаров...
    </div>

    <div v-else style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
      <div v-for="product in products" :key="product.id" style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; overflow: hidden; transition: box-shadow 0.2s;">
        <NuxtLink :to="`/catalog/${product.id}`" style="text-decoration: none;">
          <div style="height: 200px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; overflow: hidden;">
            <img v-if="product.image_url" :src="product.image_url" style="width: 100%; height: 100%; object-fit: cover;">
            <span v-else style="color: #9ca3af;">Нет фото</span>
          </div>
          <div style="padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem;">{{ product.name }}</h3>
            <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem; line-height: 1.4;">{{ product.description || 'Описание отсутствует' }}</p>
            <p style="font-size: 1.25rem; font-weight: bold; color: #16a34a; margin-bottom: 1rem;">{{ Number(product.price).toLocaleString() }} ₽</p>
          </div>
        </NuxtLink>
        <div style="padding: 0 1rem 1rem 1rem;">
          <button 
            @click="addToCart(product.id)" 
            :disabled="!product.in_stock || addingToCart === product.id"
            style="width: 100%; background: #16a34a; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: bold;"
            :style="{ opacity: (!product.in_stock || addingToCart === product.id) ? 0.6 : 1 }"
          >
            {{ addingToCart === product.id ? 'Добавление...' : 'В корзину' }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="!loading && products.length === 0" style="text-align: center; padding: 3rem; color: #6b7280;">
      Товаров пока нет
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';

const { get } = useApi();
const cartStore = useCartStore();

const products = ref([]);
const loading = ref(true);
const addingToCart = ref(null);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const data = await get('/products');
    products.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    products.value = [];
  } finally {
    loading.value = false;
  }
};

const addToCart = async (productId) => {
  addingToCart.value = productId;
  const success = await cartStore.addItem(productId, 1);
  addingToCart.value = null;
  
  if (success) {
    alert('Товар добавлен в корзину');
  }
};

fetchProducts();
</script>