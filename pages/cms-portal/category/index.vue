<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Button
                    label="New"
                    icon="pi pi-plus"
                    class="mr-2"
                    @click="showDialog = true"
                />
            </div>
        </div>

        <!-- Dialog -->
        <LazyAdminCategorySaveCategory
            v-model:show-dialog="showDialog"
        />
        <!-- /Dialog -->
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: 'CategoryList',
    layout: 'admin'
})

const showDialog = ref(false)
</script>

<style scoped>

</style>
