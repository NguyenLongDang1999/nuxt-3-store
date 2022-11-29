<template>
    <div class="grid">
        <Toast />

        <div class="col-12">
            <div class="card">
                <Button
                    :label="$t('action.create')"
                    icon="pi pi-plus"
                    class="mr-2 mb-5"
                    @click="showDialog = true"
                />

                <!-- List -->
                <LazyAdminCategoryListCategory />
                <!-- /List -->
            </div>
        </div>

        <!-- Dialog -->
        <LazyAdminCategorySaveCategory
            v-model:show-dialog="showDialog"
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
const { t } = useI18n()
const toast = useToast()

// Watch

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
