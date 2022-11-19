// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css'
  ],
  build: {
    transpile: ['primevue']
  },
  routeRules: {
    '/cms-portal/**': {
      ssr: false
    },
    '/api/v1/**': {
      cors: true
    }
  }
})
