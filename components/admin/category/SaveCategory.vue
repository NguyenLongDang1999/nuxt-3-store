<template>
    <Dialog
        :visible="props.showDialog"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :draggable="false"
        :modal="true"
        :closable="false"
        :header="form.id ? $t('category.update') : $t('category.create')"
    >
        <div class="p-fluid formgrid grid">
            <div
                v-if="form.image_uri"
                class="field col-12"
            >
                <Image
                    :src="getImageURL(ROUTE.CATEGORY, form.image_uri)"
                    :alt="form.name"
                    width="150"
                    image-class="mt-0 mx-auto mb-5 block shadow-2"
                    preview
                />
            </div>

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
                <label
                    for="parent_id"
                    class="form-label"
                >{{ $t('category.name') }}</label>

                <TreeSelect
                    id="parent_id"
                    v-model="form.parent_id"
                    :options="categoryStore.recursiveList"
                    placeholder="Vui lòng chọn"
                    class="capitalize"
                    panel-class="capitalize"
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
import { CategoryListInput } from '~~/utils/interface'

// Props & Emits
interface Props {
    showDialog: boolean
    category?: CategoryListInput,
    lazyParams: object
}

const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'update:showDialog', payload: boolean): void
    (event: 'showMessage', payload: boolean): void
}>()

// Data
const getInitialFormData = () => ({
    id: '',
    name: '',
    slug: '',
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
watch(() => props.showDialog, async (newData: boolean) => {
    if (newData) {
        if (props.category?.id) {
            Object.assign(form, props.category)
        } else {
            resetForm()
        }

        await categoryStore.getRecursiveList()
    }
})

watch(() => form.name, (newData: string) => {
    form.slug = slugify(newData)
})

// Methods
const saveCategory = async (isFormValid: boolean) => {
    valid.value = true

    if (!isFormValid) {
        return
    }

    form.parent_id = Object.keys(form.parent_id)[0]

    fillFormData(form)

    if (form.id) {
        return await categoryStore.update(form)
            .then(() => resetData())
            .catch(() => emit('showMessage', false))
    }

    return await categoryStore.create(form)
        .then(() => resetData())
        .catch(() => emit('showMessage', false))
}

const closeDialog = () => emit('update:showDialog', false)
const resetForm = () => Object.assign(form, getInitialFormData())
const resetData = () => {
    valid.value = false
    resetForm()
    categoryStore.getList({ lazyEvent: JSON.stringify(props.lazyParams) })
    closeDialog()
    emit('showMessage', true)
}
</script>

<style lang="scss" scoped>

</style>
