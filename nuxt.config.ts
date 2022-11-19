// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'primevue/resources/primevue.min.css',
        'primeflex/primeflex.css',
        'primeicons/primeicons.css',
        'assets/styles/main.scss',
        'assets/styles/index.scss'
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
    },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    }
})
