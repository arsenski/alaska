<template>
  <div style="max-width: 600px; margin: 0 auto; padding: 2rem 1rem;">
    <div style="background: white; border: 1px solid #e5e7eb; border-radius: 1rem; padding: 2rem;">
      <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem;">Профиль пользователя</h2>
      
      <form @submit.prevent="updateProfile">
        <!-- Аватар -->
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <div style="width: 100px; height: 100px; margin: 0 auto; border-radius: 50%; overflow: hidden; background: #f3f4f6; display: flex; align-items: center; justify-content: center;">
            <img v-if="form.avatar" :src="form.avatar" style="width: 100%; height: 100%; object-fit: cover;">
            <span v-else style="color: #9ca3af; font-size: 2rem;">📷</span>
          </div>
          <input type="file" @change="uploadAvatar" accept="image/*" style="margin-top: 0.5rem; font-size: 0.875rem;">
          <div v-if="uploading" style="color: #16a34a; font-size: 0.75rem; margin-top: 0.25rem;">Загрузка...</div>
        </div>
        
        <input v-model="form.email" type="email" placeholder="Email" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <input v-model="form.fullName" type="text" placeholder="ФИО" required style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <input v-model="form.phone" type="tel" placeholder="Телефон" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        <input v-model="form.address" type="text" placeholder="Адрес доставки" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
        
        <button type="submit" style="width: 100%; background: #16a34a; color: white; padding: 0.75rem; border-radius: 0.5rem; border: none; cursor: pointer; font-weight: bold;">
          Сохранить изменения
        </button>
      </form>
      
      <p v-if="success" style="color: #16a34a; text-align: center; margin-top: 1rem;">{{ success }}</p>
      <p v-if="error" style="color: #dc2626; text-align: center; margin-top: 1rem;">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
const token = import.meta.client ? localStorage.getItem('token') : null

if (!token) {
  navigateTo('/login')
}
const { get, put, uploadImage } = useApi()

const form = reactive({
  email: '',
  fullName: '',
  phone: '',
  address: '',
  avatar: ''
})

const uploading = ref(false)
const success = ref('')
const error = ref('')

// Загружаем данные пользователя
const loadProfile = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    form.email = user.email || ''
    form.fullName = user.fullName || ''
    form.phone = user.phone || ''
    form.address = user.address || ''
    form.avatar = user.avatar || ''
  } catch (e) {}
}

// Загрузка аватара
const uploadAvatar = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  uploading.value = true
  try {
    const result = await uploadImage(file)
    form.avatar = result.url
  } catch (err) {
    error.value = 'Ошибка загрузки фото'
  } finally {
    uploading.value = false
  }
}

// Обновление профиля
const updateProfile = async () => {
  error.value = ''
  success.value = ''
  
  try {
    const data = await put('/users/profile', form)
    
    // Обновляем данные в localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    user.fullName = form.fullName
    user.phone = form.phone
    user.address = form.address
    user.avatar = form.avatar
    localStorage.setItem('user', JSON.stringify(user))
    
    success.value = 'Профиль обновлён'
  } catch (err) {
    error.value = 'Ошибка сохранения'
  }
}

loadProfile()
</script>