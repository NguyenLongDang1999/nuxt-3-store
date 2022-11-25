<template>
    <Dialog
        :visible="props.showDialog"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :draggable="false"
        :modal="true"
        :closable="false"
        header="Thêm Mới Danh Mục"
    >
        <form
            class="p-fluid formgrid grid"
            @submit.prevent="saveCategory(!$v.$invalid)"
        >
            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="$v.name.$model"
                    :label="$t('category.title')"
                    name="name"
                    :type="FORM.TEXT"
                    :invalid="$v.name.$error"
                />
            </div>

            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="$v.parent_id.$model"
                    :label="$t('category.name')"
                    name="parent_id"
                    :type="FORM.DROPDOWN"
                    :options="[]"
                    :invalid="$v.parent_id.$error"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="$v.description.$model"
                    :label="$t('description')"
                    name="description"
                    :type="FORM.TEXT"
                    :invalid="$v.description.$error"
                />
            </div>

            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="$v.status.$model"
                    :label="$t('status')"
                    name="status"
                    :type="FORM.DROPDOWN"
                    :options="optionStatus"
                />
            </div>

            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="$v.popular.$model"
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
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="$v.meta_keyword.$model"
                    :label="$t('meta.keyword')"
                    name="meta_keyword"
                    :type="FORM.TEXTAREA"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="$v.meta_description.$model"
                    :label="$t('meta.description')"
                    name="meta_description"
                    :type="FORM.TEXTAREA"
                />
            </div>
        </form>

        <template #footer>
            <Button
                :label="$t('action.cancel')"
                icon="pi pi-times"
                class="p-button-text"
                @click="emit('update:showDialog', false)"
            />

            <Button
                type="submit"
                :label="$t('action.save')"
                icon="pi pi-check"
                @click="saveCategory"
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
const emit = defineEmits<{(event: 'update:showDialog', payload: boolean): void }>()

// Data
const form = reactive({
    name: '',
    parent_id: '',
    description: '',
    status: STATUS.ACTIVE,
    popular: POPULAR.INACTIVE,
    image_uri: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: ''
})

const rules = {
    name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(30)
    },
    parent_id: { required },
    status: { required },
    popular: { required },
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
const saveCategory = (isFormValid: boolean) => {
    if (!isFormValid) {
        return
    }

    console.log(form)
}
</script>

<style scoped>

</style>
