<template>
    <Dialog
        :visible="props.showDialog"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }"
        :draggable="false"
        :modal="true"
        :closable="false"
        header="Thêm Mới Danh Mục"
        @input="emit('update:showDialog', $event)"
    >
        <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="form.name"
                    label="Tiêu đề danh mục"
                    name="name"
                    :type="FORM.TEXT"
                />
            </div>

            <div class="field col-12 md:col-6">
                <label
                    for="parent_id"
                    class="form-label"
                >Danh mục cha</label>

                <InputText
                    id="parent_id"
                    v-model="form.parent_id"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="form.description"
                    label="Mô tả"
                    name="description"
                    :type="FORM.TEXT"
                />
            </div>

            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="form.status"
                    label="Trạng thái"
                    name="status"
                    :type="FORM.DROPDOWN"
                    :options="optionStatus"
                />
            </div>

            <div class="field col-12 md:col-6">
                <FormInput
                    v-model="form.popular"
                    label="Phổ biến"
                    name="popular"
                    :type="FORM.DROPDOWN"
                    :options="optionPopular"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="form.meta_title"
                    label="Meta Title"
                    name="meta_title"
                    :type="FORM.TEXTAREA"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="form.meta_keyword"
                    label="Meta Keyword"
                    name="meta_keyword"
                    :type="FORM.TEXTAREA"
                />
            </div>

            <div class="field col-12">
                <FormInput
                    v-model="form.meta_description"
                    label="Meta Description"
                    name="meta_description"
                    :type="FORM.TEXTAREA"
                />
            </div>
        </div>

        <template #footer>
            <Button
                label="Hủy Bỏ"
                icon="pi pi-times"
                class="p-button-text"
                @click="emit('update:showDialog', false)"
            />

            <Button
                label="Lưu Lại"
                icon="pi pi-check"
                @click="saveCategory"
            />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
interface Props {
    showDialog: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{(event: 'update:showDialog', payload: boolean): void }>()

const form = reactive({
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

const saveCategory = () => {
    console.log(form)
}
</script>

<style scoped>

</style>
