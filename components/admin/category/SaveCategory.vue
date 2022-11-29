<template>
    <Dialog
        :visible="props.showDialog"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :draggable="false"
        :modal="true"
        :closable="false"
        :header="$t('category.create')"
    >
        <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="$v.name.$model"
                    :label="$t('category.title')"
                    name="name"
                    :type="FORM.TEXT"
                    :invalid="$v.name.$invalid && valid"
                />
            </div>

            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="form.parent_id"
                    :label="$t('category.name')"
                    name="parent_id"
                    :type="FORM.DROPDOWN"
                    :options="[]"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="$v.description.$model"
                    :label="$t('description')"
                    name="description"
                    :type="FORM.TEXT"
                    :invalid="$v.description.$invalid && valid"
                />
            </div>

            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="form.status"
                    :label="$t('status')"
                    name="status"
                    :type="FORM.DROPDOWN"
                    :options="optionStatus"
                />
            </div>

            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="form.popular"
                    :label="$t('popular')"
                    name="popular"
                    :type="FORM.DROPDOWN"
                    :options="optionPopular"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="$v.meta_title.$model"
                    :label="$t('meta.title')"
                    name="meta_title"
                    :type="FORM.TEXTAREA"
                    :invalid="$v.meta_title.$invalid && valid"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="$v.meta_keyword.$model"
                    :label="$t('meta.keyword')"
                    name="meta_keyword"
                    :type="FORM.TEXTAREA"
                    :invalid="$v.meta_keyword.$invalid && valid"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="$v.meta_description.$model"
                    :label="$t('meta.description')"
                    name="meta_description"
                    :type="FORM.TEXTAREA"
                    :invalid="$v.meta_description.$invalid && valid"
                />
            </div>
        </div>

        <template #footer>
            <Button
                :label="$t('action.cancel')"
                icon="pi pi-times"
                class="p-button-text"
                @click="closeDialog"
            />

            <Button
                type="submit"
                :label="$t('action.save')"
                icon="pi pi-check"
                @click="saveCategory(!$v.$invalid)"
            />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
// Import
import {
    required,
    minLength,
    maxLength
} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

// Props & Emits
interface Props {
    showDialog: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'update:showDialog', payload: boolean): void
    (event: 'showMessage', payload: boolean): void
}>()

// Data
const getInitialFormData = () => ({
    name: '',
    parent_id: '',
    description: '',
    status: '',
    popular: '',
    image_uri: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: ''
})

const categoryStore = useCategoryStore()
const valid = ref(false)
const form = reactive(getInitialFormData())

const rules = {
    name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
    },
    description: { maxLength: maxLength(160) },
    meta_title: { maxLength: maxLength(60) },
    meta_keyword: { maxLength: maxLength(60) },
    meta_description: { maxLength: maxLength(160) }
}

const $v = useVuelidate(rules, form)

// Watch
watch(() => props.showDialog, (newData: boolean) => {
    if (newData) {
        // console.log('?')
    }
})

// Methods
const saveCategory = async (isFormValid: boolean) => {
    valid.value = true

    if (!isFormValid) {
        return
    }

    fillFormData(form)

    await categoryStore.create(form)
        .then(() => {
            valid.value = false
            emit('showMessage', true)
            closeDialog()
            resetForm()
            categoryStore.getList()
        })
        .catch(() => emit('showMessage', false))
}

const closeDialog = () => emit('update:showDialog', false)
const resetForm = () => Object.assign(form, getInitialFormData())
</script>

<style scoped>

</style>
