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
                v-if="form.id"
                class="field col-12"
            >
                <FileUpload
                    name="image_uri"
                    accept="image/*"
                    :max-file-size="1000000"
                    :file-limit="1"
                    :choose-label="$t('upload.choose')"
                    :show-upload-button="false"
                    :show-cancel-button="false"
                    @remove="imageURL = null"
                    @select="(event: any) => imageURL = event.files[0]"
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
const imageURL: any = ref(null)
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
watch(() => props.showDialog, (newData: boolean) => newData && props.category?.id ? Object.assign(form, props.category) : resetForm())
watch(() => form.name, (newData: string) => {
    form.slug = slugify(newData)
})

// Methods
const saveCategory = async (isFormValid: boolean) => {
    valid.value = true

    if (!isFormValid) {
        return
    }

    fillFormData(form)

    if (imageURL.value) {
        form.image_uri = form.slug + '.' + getExtensionFile(imageURL.value?.name)
    }

    if (form.id) {
        return await categoryStore.update(form)
            .then(async () => {
                if (imageURL.value) {
                    await useFetchPutFile(ROUTE.CATEGORY + '/' + form.image_uri, imageURL.value)
                }

                return resetData()
            })
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
