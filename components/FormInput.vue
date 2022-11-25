<template>
    <label
        :for="props.name"
        class="form-label"
    >{{ props.label }}</label>

    <InputText
        v-if="props.type === FORM.TEXT"
        :id="props.name"
        :model-value="props.modelValue"
        :class="{
            'p-invalid': props.invalid
        }"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <Textarea
        v-if="props.type === FORM.TEXTAREA"
        :id="props.name"
        :model-value="props.modelValue"
        rows="2"
        :class="{
            'p-invalid': props.invalid
        }"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <Dropdown
        v-if="props.type === FORM.DROPDOWN"
        :id="props.name"
        :options="options"
        :class="{
            'p-invalid': props.invalid
        }"
        class="capitalize"
        panel-class="capitalize"
        :model-value="props.modelValue"
        :value="props.modelValue"
        option-label="label"
        option-value="value"
        placeholder="Vui lòng chọn"
        @change="emit('update:modelValue', $event.value)"
    />
</template>

<script setup lang="ts">
interface Options {
    label: string,
    value: number
}

interface Props {
    label: string,
    name: string,
    type: number,
    modelValue?: any,
    options?: Options[],
    invalid?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{(event: 'update:modelValue', payload: string): void }>()
</script>
