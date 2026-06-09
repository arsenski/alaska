<template>
  <div style="max-width: 1280px; margin: 0 auto; padding: 2rem 1rem;">
    <h1 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 2rem;">Админ панель</h1>

    <!-- Форма добавления товара -->
    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem;">
      <h2 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Добавить товар</h2>
      
      <form @submit.prevent="addProduct" style="display: flex; flex-direction: column; gap: 1rem;">
        <input v-model="newProduct.name" type="text" placeholder="Название товара" required style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <input v-model="newProduct.slug" type="text" placeholder="Slug (url-имя)" required style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <textarea v-model="newProduct.description" placeholder="Описание" rows="3" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem;"></textarea>
        <input v-model="newProduct.price" type="number" placeholder="Цена" required style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        
        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Изображение</label>
          <input type="file" @change="handleFileUpload" accept="image/*" style="padding: 0.5rem;">
          <div v-if="uploadingImage" style="color: #16a34a; font-size: 0.875rem; margin-top: 0.5rem;">Загрузка...</div>
          <div v-if="newProduct.imageUrl" style="margin-top: 0.5rem;">
            <img :src="newProduct.imageUrl" style="width: 100px; height: 100px; object-fit: cover; border-radius: 0.5rem;">
          </div>
        </div>
        
        <label style="display: flex; align-items: center; gap: 0.5rem;">
          <input v-model="newProduct.inStock" type="checkbox">
          <span>В наличии</span>
        </label>
        <button type="submit" style="background: #16a34a; color: white; padding: 0.75rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: bold;">
          Добавить товар
        </button>
      </form>
    </div>

    <!-- Список товаров -->
    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; overflow: hidden;">
      <h2 style="font-size: 1.25rem; font-weight: bold; padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;">Список товаров</h2>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead style="background: #f9fafb;">
            <tr>
              <th style="padding: 0.75rem; text-align: left;">ID</th>
              <th style="padding: 0.75rem; text-align: left;">Изображение</th>
              <th style="padding: 0.75rem; text-align: left;">Название</th>
              <th style="padding: 0.75rem; text-align: left;">Цена</th>
              <th style="padding: 0.75rem; text-align: left;">В наличии</th>
              <th style="padding: 0.75rem; text-align: left;">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 0.75rem;">{{ product.id }}</td>
              <td style="padding: 0.75rem;">
                <img v-if="product.imageUrl" :src="product.imageUrl" style="width: 50px; height: 50px; object-fit: cover; border-radius: 0.25rem;">
                <span v-else style="color: #9ca3af;">Нет фото</span>
              </td>
              <td style="padding: 0.75rem; font-weight: 500;">{{ product.name }}</td>
              <td style="padding: 0.75rem;">{{ Number(product.price).toLocaleString() }} ₽</td>
              <td style="padding: 0.75rem;">
                <span :style="{ background: product.inStock ? '#dcfce7' : '#fee2e2', color: product.inStock ? '#16a34a' : '#dc2626', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }">
                  {{ product.inStock ? 'В наличии' : 'Нет' }}
                </span>
              </td>
              <td style="padding: 0.75rem;">
                <button @click="editProduct(product)" style="color: #2563eb; background: none; border: none; cursor: pointer; margin-right: 1rem;">
                  Редактировать
                </button>
                <button @click="deleteProduct(product.id)" style="color: #dc2626; background: none; border: none; cursor: pointer;">
                  Удалить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Список пользователей -->
    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; overflow: hidden; margin-top: 2rem;">
      <h2 style="font-size: 1.25rem; font-weight: bold; padding: 1rem 1.5rem; border-bottom: 1px solid #e5e7eb;">Пользователи</h2>
      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead style="background: #f9fafb;">
            <tr>
              <th style="padding: 0.75rem; text-align: left;">ID</th>
              <th style="padding: 0.75rem; text-align: left;">Email</th>
              <th style="padding: 0.75rem; text-align: left;">ФИО</th>
              <th style="padding: 0.75rem; text-align: left;">Телефон</th>
              <th style="padding: 0.75rem; text-align: left;">Админ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" style="border-bottom: 1px solid #e5e7eb;">
              <td style="padding: 0.75rem;">{{ user.id }}</td>
              <td style="padding: 0.75rem;">{{ user.email }}</td>
              <td style="padding: 0.75rem;">{{ user.fullName }}</td>
              <td style="padding: 0.75rem;">{{ user.phone || '-' }}</td>
              <td style="padding: 0.75rem;">
                <span :style="{ background: user.isAdmin ? '#dcfce7' : '#f3f4f6', color: user.isAdmin ? '#16a34a' : '#6b7280', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }">
                  {{ user.isAdmin ? 'Админ' : 'Пользователь' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Модальное окно редактирования -->
    <div v-if="editingProduct" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div style="background: white; border-radius: 1rem; padding: 2rem; max-width: 500px; width: 90%;">
        <h2 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">Редактировать товар</h2>
        
        <form @submit.prevent="updateProduct" style="display: flex; flex-direction: column; gap: 1rem;">
          <input v-model="editForm.name" type="text" placeholder="Название" required style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
          <input v-model="editForm.slug" type="text" placeholder="Slug" required style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
          <textarea v-model="editForm.description" placeholder="Описание" rows="3" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem;"></textarea>
          <input v-model="editForm.price" type="number" placeholder="Цена" required style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
          
          <div>
            <label>Изображение</label>
            <input type="file" @change="handleEditFileUpload" accept="image/*" style="margin-top: 0.5rem;">
            <img v-if="editForm.imageUrl" :src="editForm.imageUrl" style="width: 100px; margin-top: 0.5rem; border-radius: 0.5rem;">
          </div>
          
          <label style="display: flex; align-items: center; gap: 0.5rem;">
            <input v-model="editForm.inStock" type="checkbox">
            <span>В наличии</span>
          </label>
          
          <div style="display: flex; gap: 1rem; margin-top: 1rem;">
            <button type="submit" style="flex: 1; background: #16a34a; color: white; padding: 0.75rem; border-radius: 0.5rem; border: none; cursor: pointer;">
              Сохранить
            </button>
            <button type="button" @click="closeEdit" style="flex: 1; background: #9ca3af; color: white; padding: 0.75rem; border-radius: 0.5rem; border: none; cursor: pointer;">
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { get, post, put, del, uploadImage } = useApi()

const products = ref([])
const users = ref([])
const editingProduct = ref(null)
const uploadingImage = ref(false)

const newProduct = reactive({
  name: '',
  slug: '',
  description: '',
  price: 0,
  imageUrl: '',
  inStock: true
})

const editForm = reactive({
  id: null,
  name: '',
  slug: '',
  description: '',
  price: 0,
  imageUrl: '',
  inStock: true
})

const fetchProducts = async () => {
  try {
    const data = await get('/products')
    products.value = Array.isArray(data) ? data.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      imageUrl: p.image_url,
      inStock: p.in_stock === true || p.in_stock === 'true' || p.in_stock === 1,
      created_at: p.created_at,
      updated_at: p.updated_at
    })) : []
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error)
    products.value = []
  }
}

const fetchUsers = async () => {
  try {
    const data = await get('/users')
    users.value = Array.isArray(data) ? data.map(u => ({
      id: u.id,
      email: u.email,
      fullName: u.full_name,
      phone: u.phone,
      isAdmin: u.is_admin === true || u.is_admin === 'true' || u.is_admin === 1
    })) : []
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error)
    users.value = []
  }
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  uploadingImage.value = true
  try {
    const result = await uploadImage(file)
    newProduct.imageUrl = result.url
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  } finally {
    uploadingImage.value = false
  }
}

const handleEditFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  uploadingImage.value = true
  try {
    const result = await uploadImage(file)
    editForm.imageUrl = result.url
  } catch (error) {
    console.error('Ошибка загрузки:', error)
  } finally {
    uploadingImage.value = false
  }
}

const addProduct = async () => {
  try {
    await post('/products', newProduct)
    newProduct.name = ''
    newProduct.slug = ''
    newProduct.description = ''
    newProduct.price = 0
    newProduct.imageUrl = ''
    newProduct.inStock = true
    await fetchProducts()
    alert('Товар добавлен')
  } catch (error) {
    console.error('Ошибка добавления:', error)
    alert('Ошибка при добавлении товара')
  }
}

const editProduct = (product) => {
  editingProduct.value = product
  editForm.id = product.id
  editForm.name = product.name
  editForm.slug = product.slug
  editForm.description = product.description || ''
  editForm.price = product.price
  editForm.imageUrl = product.imageUrl || ''
  editForm.inStock = product.inStock === true
}

const updateProduct = async () => {
  try {
    const productData = {
      name: editForm.name,
      slug: editForm.slug,
      description: editForm.description,
      price: parseFloat(editForm.price),
      image_url: editForm.imageUrl,
      in_stock: editForm.inStock === true
    }
    
    const result = await put(`/products/${editForm.id}`, productData)
    
    if (result && result.id) {
      editingProduct.value = null
      await fetchProducts()
      alert('Товар обновлён')
    } else {
      alert('Ошибка обновления: ' + (result.message || 'неизвестная ошибка'))
    }
  } catch (error) {
    console.error('Ошибка обновления:', error)
    alert('Ошибка при обновлении')
  }
}

const closeEdit = () => {
  editingProduct.value = null
}

const deleteProduct = async (id) => {
  if (confirm('Удалить товар?')) {
    try {
      await del(`/products/${id}`)
      await fetchProducts()
      alert('Товар удален')
    } catch (error) {
      console.error('Ошибка удаления:', error)
      alert('Ошибка при удалении')
    }
  }
}

// Загружаем данные
const loadData = async () => {
  await fetchProducts()
  await fetchUsers()
}

loadData()
</script>