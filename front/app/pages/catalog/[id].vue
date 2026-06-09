<template>
  <div style="max-width: 1280px; margin: 0 auto; padding: 2rem 1rem;">
    <div v-if="loading" style="text-align: center; padding: 3rem; color: #6b7280;">
      Загрузка...
    </div>
    
    <div v-else-if="!product" style="text-align: center; padding: 3rem; color: #6b7280;">
      Товар не найден
    </div>
    
    <div v-else style="display: flex; flex-wrap: wrap; gap: 2rem;">
      <div style="flex: 1; min-width: 280px;">
        <img v-if="product.image_url" :src="product.image_url" style="width: 100%; border-radius: 1rem;">
        <div v-else style="width: 100%; height: 300px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; border-radius: 1rem; color: #9ca3af;">
          Нет фото
        </div>
      </div>
      
      <div style="flex: 1; min-width: 280px;">
        <h1 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">{{ product.name }}</h1>
        <p style="color: #6b7280; line-height: 1.6; margin-bottom: 1rem;">{{ product.description || 'Описание отсутствует' }}</p>
        <p style="font-size: 2rem; font-weight: bold; color: #16a34a; margin-bottom: 1rem;">{{ Number(product.price).toLocaleString() }} ₽</p>
        <p style="margin-bottom: 1rem;">
          <span :style="{ background: product.in_stock ? '#dcfce7' : '#fee2e2', color: product.in_stock ? '#16a34a' : '#dc2626', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem' }">
            {{ product.in_stock ? 'В наличии' : 'Нет в наличии' }}
          </span>
        </p>
        <button 
          @click="addToCart" 
          :disabled="!product.in_stock || addingToCart"
          style="background: #16a34a; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: bold;"
          :style="{ opacity: (!product.in_stock || addingToCart) ? 0.6 : 1, cursor: (!product.in_stock || addingToCart) ? 'not-allowed' : 'pointer' }"
        >
          {{ addingToCart ? 'Добавление...' : 'Добавить в корзину' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';

const route = useRoute();
const { get } = useApi();
const cartStore = useCartStore();

const product = ref(null);
const loading = ref(true);
const addingToCart = ref(false);

const fetchProduct = async () => {
  loading.value = true;
  try {
    const data = await get(`/products/id/${route.params.id}`);
    product.value = data;
  } catch (error) {
    console.error('Ошибка загрузки товара:', error);
  } finally {
    loading.value = false;
  }
};

const addToCart = async () => {
  if (!product.value || !product.value.in_stock) return;
  
  addingToCart.value = true;
  const success = await cartStore.addItem(product.value.id, 1);
  addingToCart.value = false;
  
  if (success) {
    alert('Товар добавлен в корзину');
  }
};

fetchProduct();
</script>