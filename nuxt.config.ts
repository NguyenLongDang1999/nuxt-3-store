// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'primevue/resources/primevue.min.css',
        'primeflex/primeflex.css',
        'primeicons/primeicons.css',
        'assets/styles/main.scss',
        'assets/styles/index.scss'
    ],
    build: { transpile: ['primevue'] },
    routeRules: {
        '/cms-portal/**': { ssr: false },
        '/api/v1/**': { cors: true }
    },
    modules: [
        ['@pinia/nuxt', { autoImports: ['defineStore'] }]
    ],
    runtimeConfig: {
        public: {
            apiBaseURL: process.env.NUXT_APP_BASE_URL_API || '/api',
            bunnyCdnURL: process.env.NUXT_APP_BUNNY_CDN_URL,
            bunnyCDN: process.env.NUXT_APP_BUNNY_CDN_IMAGE,
            bunnyAPIKey: process.env.NUXT_APP_BUNNY_API_KEY,
            bunnyAccessKey: process.env.NUXT_APP_ACCESS_KEY
        }
    },
    imports: { dirs: ['stores'] },
    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        }
    }
})
