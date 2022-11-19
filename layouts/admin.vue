<template>
    <div
        :class="containerClass"
        @click="onWrapperClick"
    >
        <LazyAdminTopBar @menu-toggle="onMenuToggle" />

        <div
            class="layout-sidebar"
            @click="menuClick = true"
        >
            <LazyAdminMenuBar
                :model="menu"
                @menuitem-click="onMenuItemClick"
            />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <slot />
            </div>
        </div>

        <transition name="layout-mask">
            <div
                v-if="mobileMenuActive"
                class="layout-mask p-component-overlay"
            />
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu: [
                {
                    label: 'Home',
                    items: [{
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        to: 'Dashboard'
                    }]
                }
            ]
        }
    },
    computed: {
        containerClass () {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive
            }]
        }
    },
    watch: {
        $route () {
            this.menuActive = false
        }
    },
    beforeUpdate () {
        this.mobileMenuActive
            ? this.addClass(document.body, 'body-overflow-hidden')
            : this.removeClass(document.body, 'body-overflow-hidden')
    },
    methods: {
        onWrapperClick () {
            if (!this.menuClick) {
                this.overlayMenuActive = false
                this.mobileMenuActive = false
            }

            this.menuClick = false
        },
        onMenuToggle () {
            this.menuClick = true

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
                    if (this.mobileMenuActive === true) {
                        this.overlayMenuActive = true
                    }

                    this.overlayMenuActive = !this.overlayMenuActive
                    this.mobileMenuActive = false
                } else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive
                }
            } else {
                this.mobileMenuActive = !this.mobileMenuActive
            }

            event.preventDefault()
        },
        onMenuItemClick (event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false
                this.mobileMenuActive = false
            }
        },
        addClass (element, className) {
            element.classList
                ? element.classList.add(className)
                : element.className += ' ' + className
        },
        removeClass (element, className) {
            element.classList
                ? element.classList.remove(className)
                : element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
        },
        isDesktop () {
            return window.innerWidth >= 992
        },
        isSidebarVisible () {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static') {
                    return !this.staticMenuInactive
                } else if (this.layoutMode === 'overlay') {
                    return this.overlayMenuActive
                }
            }

            return true
        }
    }
}
</script>
