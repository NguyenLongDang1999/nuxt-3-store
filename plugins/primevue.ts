import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Dialog from 'primevue/dialog'
import Badge from 'primevue/badge'
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Password from 'primevue/password'
import DataTable from 'primevue/datatable'
import TreeSelect from 'primevue/treeselect'
import Column from 'primevue/column'
import Toast from 'primevue/toast'
import FileUpload from 'primevue/fileupload'
import BadgeDirective from 'primevue/badgedirective'
import ConfirmDialog from 'primevue/confirmdialog'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import StyleClass from 'primevue/styleclass'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true })
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.use(ConfirmationService)

    // Components
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component('Menu', Menu)
    nuxtApp.vueApp.component('Dialog', Dialog)
    nuxtApp.vueApp.component('Badge', Badge)
    nuxtApp.vueApp.component('Image', Image)
    nuxtApp.vueApp.component('InputText', InputText)
    nuxtApp.vueApp.component('Dropdown', Dropdown)
    nuxtApp.vueApp.component('Textarea', Textarea)
    nuxtApp.vueApp.component('Password', Password)
    nuxtApp.vueApp.component('DataTable', DataTable)
    nuxtApp.vueApp.component('Column', Column)
    nuxtApp.vueApp.component('Toast', Toast)
    nuxtApp.vueApp.component('ConfirmDialog', ConfirmDialog)
    nuxtApp.vueApp.component('FileUpload', FileUpload)
    nuxtApp.vueApp.component('TreeSelect', TreeSelect)

    // Directive
    nuxtApp.vueApp.directive('styleclass', StyleClass)
    nuxtApp.vueApp.directive('badge', BadgeDirective)
})
