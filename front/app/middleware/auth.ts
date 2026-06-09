export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    
    if (!token) {
      return navigateTo('/login')
    }
    
    try {
      const user = JSON.parse(userStr || '{}')
      if (!user.isAdmin) {
        return navigateTo('/login')
      }
    } catch (e) {
      return navigateTo('/login')
    }
  }
})