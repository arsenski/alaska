import { defineStore } from 'pinia';

interface CartItemProduct {
  id: number;
  name: string;
  price: number;
  image_url: string;
  in_stock: boolean;
}

interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  added_at: string;
  Product?: CartItemProduct;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const loading = ref(false);
  const initialized = ref(false);

  const totalCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      const price = item.Product?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
  });

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      items.value = [];
      initialized.value = true;
      return;
    }
    
    loading.value = true;
    try {
      const { get } = useApi();
      const data = await get('/cart');
      items.value = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error);
      items.value = [];
    } finally {
      loading.value = false;
      initialized.value = true;
    }
  };

  const addItem = async (productId: number, quantity: number = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Войдите в аккаунт для добавления товаров в корзину');
      navigateTo('/login');
      return false;
    }
    
    try {
      const { post } = useApi();
      const result = await post('/cart/add', { productId, quantity });
      console.log('Результат добавления:', result);
      await fetchCart();
      return true;
    } catch (error: any) {
      console.error('Ошибка добавления:', error);
      const errorMessage = error?.data?.error || error?.message || 'Ошибка при добавлении товара';
      alert(errorMessage);
      return false;
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      const { put } = useApi();
      await put(`/cart/update/${productId}`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error('Ошибка обновления:', error);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      const { del } = useApi();
      await del(`/cart/remove/${productId}`);
      await fetchCart();
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  const clearCart = async () => {
    try {
      const { del } = useApi();
      await del('/cart/clear');
      await fetchCart();
    } catch (error) {
      console.error('Ошибка очистки:', error);
    }
  };

  return {
    items,
    loading,
    initialized,
    totalCount,
    totalPrice,
    fetchCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  };
});