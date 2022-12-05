<template>
    <Dialog
        :visible="props.showDialog"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :draggable="false"
        :modal="true"
        :closable="false"
        :header="$t('upload.main')"
    >
        <div class="p-fluid formgrid grid">
            <div class="field col-12">
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
                :disabled="!imageURL"
                @click="saveCategory"
            />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { CategoryListInput } from '~~/utils/interface'

// Props & Emits
interface Props {
    showDialog: boolean
    category?: CategoryListInput
    lazyParams: object
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
    slug: '',
    image_uri: ''
})

const categoryStore = useCategoryStore()
const form = reactive(getInitialFormData())

// Watch
watch(() => props.showDialog, (newData: boolean) => newData && props.category?.id ? Object.assign(form, props.category) : resetForm())

// Methods
const saveCategory = async () => {
    fillFormData(form)

    form.image_uri = form.slug + '.' + getExtensionFile(imageURL.value?.name)

    return await categoryStore.update(form)
        .then(async () => {
            await useFetchPutFile(ROUTE.CATEGORY + '/' + form.image_uri, imageURL.value)
            return resetData()
        })
        .catch(() => emit('showMessage', false))
}

const closeDialog = () => emit('update:showDialog', false)
const resetForm = () => Object.assign(form, getInitialFormData())
const resetData = () => {
    resetForm()
    categoryStore.getList({ lazyEvent: JSON.stringify(props.lazyParams) })
    closeDialog()
    emit('showMessage', true)
}
</script>
