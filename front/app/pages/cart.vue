<template>
  <div style="max-width: 1280px; margin: 0 auto; padding: 2rem 1rem;">
    <h1 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 2rem;">Корзина</h1>

    <div v-if="cartStore.loading" style="text-align: center; padding: 3rem; color: #6b7280;">
      Загрузка корзины...
    </div>

    <div v-else-if="cartStore.items.length === 0" style="text-align: center; padding: 3rem;">
      <p style="color: #6b7280; margin-bottom: 1rem;">Ваша корзина пуста</p>
      <NuxtLink to="/catalog">
        <button style="background: #16a34a; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: none; cursor: pointer;">
          Перейти в каталог
        </button>
      </NuxtLink>
    </div>

    <div v-else>
      <!-- Список товаров -->
      <div style="margin-bottom: 2rem;">
        <div v-for="item in cartStore.items" :key="item.id" style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1rem; margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
          <!-- Изображение -->
          <div style="width: 80px; height: 80px; background: #f3f4f6; border-radius: 0.5rem; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img v-if="item.Product?.image_url" :src="item.Product.image_url" style="width: 100%; height: 100%; object-fit: cover;">
            <span v-else style="color: #9ca3af; font-size: 0.75rem;">Нет фото</span>
          </div>
          
          <!-- Информация -->
          <div style="flex: 1; min-width: 150px;">
            <h3 style="font-weight: bold; color: #1f2937; margin-bottom: 0.25rem;">{{ item.Product?.name }}</h3>
            <p style="color: #16a34a; font-weight: bold;">{{ Number(item.Product?.price).toLocaleString() }} ₽</p>
          </div>
          
          <!-- Количество -->
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button @click="cartStore.updateQuantity(item.product_id, item.quantity - 1)" style="width: 2rem; height: 2rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background: white; cursor: pointer;">-</button>
            <span style="width: 3rem; text-align: center;">{{ item.quantity }}</span>
            <button @click="cartStore.updateQuantity(item.product_id, item.quantity + 1)" style="width: 2rem; height: 2rem; border: 1px solid #d1d5db; border-radius: 0.5rem; background: white; cursor: pointer;">+</button>
          </div>
          
          <!-- Сумма и удаление -->
          <div style="min-width: 120px; text-align: right;">
            <p style="font-weight: bold; color: #1f2937;">{{ ((item.Product?.price || 0) * item.quantity).toLocaleString() }} ₽</p>
            <button @click="cartStore.removeItem(item.product_id)" style="color: #dc2626; background: none; border: none; cursor: pointer; font-size: 0.875rem;">
              Удалить
            </button>
          </div>
        </div>
      </div>
      
      <!-- Итого и оформление -->
      <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <p style="font-size: 0.875rem; color: #6b7280;">Итого</p>
          <p style="font-size: 1.5rem; font-weight: bold; color: #1f2937;">{{ cartStore.totalPrice.toLocaleString() }} ₽</p>
        </div>
        <NuxtLink to="/checkout">
          <button style="background: #16a34a; color: white; padding: 0.75rem 2rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: bold;">
            Оформить заказ
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cartStore';

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchCart();
});
</script>