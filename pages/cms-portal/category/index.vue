<template>
    <div class="grid">
        <Toast />

        <div class="col-12">
            <div class="card">
                <Button
                    :label="$t('action.create')"
                    icon="pi pi-plus"
                    class="mr-2 mb-5"
                    @click="() => {
                        category = {}
                        showDialog = true
                    }"
                />

                <!-- List -->
                <LazyAdminCategoryListCategory
                    @show-dialog="(val: boolean) => showDialog = val"
                    @show-upload-dialog="(val: boolean) => showUploadDialog = val"
                    @show-category="(val: object) => category = val"
                    @show-message="showMessage"
                    @show-pagination="(val: object) => lazyParams = val"
                />
                <!-- /List -->
            </div>
        </div>

        <!-- Dialog -->
        <LazyAdminCategorySaveCategory
            v-model:show-dialog="showDialog"
            :category="category"
            :lazy-params="lazyParams"
            @show-message="showMessage"
        />

        <LazyAdminCategoryUploadCategory
            v-model:show-dialog="showUploadDialog"
            :category="category"
            :lazy-params="lazyParams"
            @show-message="showMessage"
        />
        <!-- /Dialog -->
    </div>
</template>

<script setup lang="ts">
// Import
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

definePageMeta({
    name: 'CategoryList',
    layout: 'admin'
})

// Data
const showDialog = ref(false)
const showUploadDialog = ref(false)
const { t } = useI18n()
const toast = useToast()
const category = reactive({})
const lazyParams = reactive({})

// Methods
const showMessage = (val: boolean) => {
    toastMessage(val ? TOAST.SUCCESS : TOAST.ERROR)
}

const toastMessage = (type: string) => {
    toast.add({
        severity: type,
        summary: type === TOAST.SUCCESS ? t('toast.success') : t('toast.error'),
        detail: type === TOAST.SUCCESS ? t('toast.message_success', { name: t('category.name') }) : t('toast.message_error'),
        life: 3000
    })
}
</script>
