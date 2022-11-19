import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import StyleClass from 'primevue/styleclass'
import {
    defineNuxtPlugin
} from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {
        ripple: true
    })
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Menu', Menu)
    nuxtApp.vueApp.directive('styleclass', StyleClass)
})
