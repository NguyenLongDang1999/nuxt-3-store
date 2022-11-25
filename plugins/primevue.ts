import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Password from 'primevue/password'
import StyleClass from 'primevue/styleclass'
import {
    defineNuxtPlugin
} from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {
        ripple: true
    })

    // Components
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Menu', Menu)
    nuxtApp.vueApp.component('Dialog', Dialog)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Dropdown', Dropdown)
    nuxtApp.vueApp.component('Textarea', Textarea)
    nuxtApp.vueApp.component('Password', Password)

    // Directive
    nuxtApp.vueApp.directive('styleclass', StyleClass)
})
