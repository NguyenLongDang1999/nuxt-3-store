<template>
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
        responsive-layout="stack"
        breakpoint="960px"
        @page="onPage($event)"
    >
        <Column
            field="name"
            :header="$t('category.title')"
            class="capitalize"
        />

        <Column
            field="parentCategory.name"
            :header="$t('category.parent_id')"
            class="capitalize"
        />

        <Column
            field="status"
            :header="$t('status')"
            class="capitalize"
        >
            <template #body="slotProps">
                <span
                    class="product-badge"
                    :class="slotProps.data.status === STATUS.ACTIVE ? 'status-instock' : 'status-outofstock'"
                >
                    {{ optionStatus.find((item) => slotProps.data.status === item.value)?.label }}
                </span>
            </template>
        </Column>

        <Column
            field="popular"
            :header="$t('popular')"
            class="capitalize"
        >
            <template #body="slotProps">
                <span
                    class="product-badge"
                    :class="slotProps.data.popular === POPULAR.ACTIVE ? 'status-instock' : 'status-outofstock'"
                >
                    {{ optionPopular.find((item) => slotProps.data.popular === item.value)?.label }}
                </span>
            </template>
        </Column>

        <Column header-style="min-width:10rem;">
            <template #body="slotProps">
                <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-success mr-2"
                    @click="editCategory(slotProps.data)"
                />
                <Button
                    icon="pi pi-trash"
                    class="p-button-rounded p-button-warning mt-2"
                />
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
// Data
const dt = ref()
const lazyParams = ref({})
const totalRecords = ref(0)
const loading = ref(false)

// Props & Emits
const emit = defineEmits<{
    (event: 'showCategory', payload: object): void
    (event: 'showDialog', payload: boolean): void
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
    getCategoryList()
}

const editCategory = (category: object) => {
    emit('showDialog', true)
    emit('showCategory', category)
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
