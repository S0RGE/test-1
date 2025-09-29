export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/index.css"],
  typescript: {
    strict: true,
  },
});
