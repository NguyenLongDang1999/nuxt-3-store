<template>
    <div class="layout-topbar">
        <NuxtLink
            to="/"
            class="layout-topbar-logo"
        >
            <!-- <img alt="Logo"> -->
            <span>CMS</span>
        </NuxtLink>

        <button
            class="p-link layout-menu-button layout-topbar-button"
            @click="(event) => $emit('menu-toggle', event)"
        >
            <i class="pi pi-bars" />
        </button>

        <button
            v-styleclass="{
                selector: '@next',
                enterClass: 'hidden',
                enterActiveClass: 'scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'fadeout',
                hideOnOutsideClick: true
            }"
            class="p-link layout-topbar-menu-button layout-topbar-button"
        >
            <i class="pi pi-ellipsis-v" />
        </button>

        <ul class="layout-topbar-menu hidden lg:flex origin-top">
            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-calendar" />
                    <span>Events</span>
                </button>
            </li>

            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-cog" />
                    <span>Settings</span>
                </button>
            </li>

            <li>
                <button class="p-link layout-topbar-button">
                    <i class="pi pi-user" />
                    <span>Profile</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})
defineEmits(['menu-toggle'])
</script>

<style scoped>

</style>
