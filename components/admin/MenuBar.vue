<template>
    <div class="layout-menu-container">
        <LazyAdminSubMenu
            :items="model"
            class="layout-menu"
            :root="true"
            @menuitem-click="event => $emit('menuitem-click', event)"
            @keydown="onKeyDown"
        />
    </div>
</template>

<script>
export default {
    props: {
        model: {
            type: Array,
            default: () => []
        }
    },
    emits: ['menuitem-click'],
    methods: {
        onKeyDown (event) {
            const nodeElement = event.target
            if (event.code === 'Enter' || event.code === 'Space') {
                nodeElement.click()
                event.preventDefault()
            }
        }
    }
}
</script>
