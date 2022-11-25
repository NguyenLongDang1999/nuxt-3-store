import {
    createI18n
} from 'vue-i18n'
import {
    defineNuxtPlugin
} from '#app'
import en from '../locales/en.json'
import vi from '../locales/vi.json'

export default defineNuxtPlugin((nuxtApp) => {
    const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: 'vi',
        messages: {
            en,
            vi
        }
    })

    nuxtApp.vueApp.use(i18n)
})
