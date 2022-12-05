<template>
    <ConfirmDialog />

    <DataTable
        ref="dt"
        :lazy="true"
        :loading="loading"
        :paginator="true"
        :rows="PAGINATOR.SIZE"
        :total-records="totalRecords"
        :value="categoryStore.categoryList"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        data-key="id"
        responsive-layout="scroll"
        breakpoint="960px"
        @page="onPage($event)"
    >
        <Column
            field="name"
            :header="$t('category.title')"
            class="capitalize"
            style="min-width: 14rem"
        >
            <template #body="slotProps">
                <Image
                    v-if="slotProps.data.image_uri"
                    :src="getImageURL(ROUTE.CATEGORY, slotProps.data.image_uri)"
                    :alt="slotProps.data.name"
                    width="50"
                    image-class="rounded"
                    preview
                />

                <Button
                    :label="slotProps.data.name"
                    class="p-button-link text-left"
                    @click="editCategory(slotProps.data)"
                />
            </template>
        </Column>

        <Column
            field="parentCategory.name"
            :header="$t('category.parent_id')"
            class="capitalize"
            style="min-width: 14rem"
        />

        <Column
            field="status"
            :header="$t('status')"
            class="capitalize"
            style="min-width: 8rem"
        >
            <template #body="slotProps">
                <Badge
                    :severity="slotProps.data.status === STATUS.ACTIVE ? 'success' : 'danger'"
                    size="large"
                >
                    <i :class="optionStatus.find((item) => slotProps.data.status === item.value)?.icon" />
                </Badge>
            </template>
        </Column>

        <Column
            field="popular"
            :header="$t('popular')"
            class="capitalize"
            style="min-width: 8rem"
        >
            <template #body="slotProps">
                <Badge
                    :severity="slotProps.data.popular === POPULAR.ACTIVE ? 'success' : 'danger'"
                    size="large"
                >
                    <i :class="optionPopular.find((item) => slotProps.data.popular === item.value)?.icon" />
                </Badge>
            </template>
        </Column>

        <Column style="min-width: 14rem">
            <template #body="slotProps">
                <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-success mr-2"
                    @click="editCategory(slotProps.data)"
                />

                <Button
                    icon="pi pi-upload"
                    class="p-button-rounded p-button-info mr-2"
                    @click="uploadCategory(slotProps.data)"
                />

                <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-warning mt-2"
                    @click="deleteCategory(slotProps.data?.id)"
                />
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'

// Data
const confirm = useConfirm()
const { t } = useI18n()
const dt = ref()
const lazyParams = ref({})
const totalRecords = ref(0)
const loading = ref(false)

// Props & Emits
const emit = defineEmits<{
    (event: 'showCategory', payload: object): void
    (event: 'showDialog', payload: boolean): void
    (event: 'showMessage', payload: boolean): void
    (event: 'showPagination', payload: object): void
    (event: 'showUploadDialog', payload: boolean): void
}>()

// Store
const categoryStore = useCategoryStore()

// Methods
const getCategoryList = () => {
    loading.value = true

    setTimeout(async () => {
        return await categoryStore.getList({ lazyEvent: JSON.stringify(lazyParams.value) })
            .then((data) => {
                totalRecords.value = data._count
                loading.value = false
            })
    }, Math.random() * 1000 + 250)
}

const onPage = (event: any) => {
    lazyParams.value = event
    emit('showPagination', lazyParams.value)
    getCategoryList()
}

const uploadCategory = (category: object) => {
    emit('showUploadDialog', true)
    emit('showCategory', category)
}

const editCategory = (category: object) => {
    emit('showDialog', true)
    emit('showCategory', category)
}

const removeCategory = async (id: string) => {
    return await categoryStore.remove(id)
        .then(() => resetData())
        .catch(() => emit('showMessage', false))
}

const deleteCategory = (id: string) => {
    confirm.require({
        message: t('confirm.message', { name: t('category.name') }),
        header: t('confirm.header'),
        icon: 'pi pi-exclamation-triangle',
        accept: () => removeCategory(id)
    })
}

const resetData = () => {
    getCategoryList()
    emit('showMessage', true)
}

onMounted(() => {
    loading.value = true

    lazyParams.value = {
        first: 0,
        rows: dt.value.rows
    }

    getCategoryList()
})
</script>
