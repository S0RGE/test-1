import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt().append({
  rules: {
    'vue/html-self-closing': 'off'
  }
})
