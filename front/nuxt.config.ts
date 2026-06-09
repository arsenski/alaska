export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:5000/api'
    }
  },
  colorMode: { preference: 'light' },
  compatibilityDate: '2025-04-04'
})