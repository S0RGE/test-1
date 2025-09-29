export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/fonts.css', '~/assets/css/colors.css'],
  typescript: {
    strict: true
  }
})
