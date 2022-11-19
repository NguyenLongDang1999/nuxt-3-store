<template>
    <div>
        <Menu :model="items" />
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const items = ref([
            {
                label: 'Options',
                items: [{
                    label: 'Update',
                    icon: 'pi pi-refresh',
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                }]
            },
            {
                label: 'Navigate',
                items: [{
                    label: 'Vue Website',
                    icon: 'pi pi-external-link',
                    url: 'https://vuejs.org/'
                },
                {
                    label: 'Router',
                    icon: 'pi pi-upload',
                    command: () => {
                        window.location.hash = "/fileupload"
                    }
                }
                ]
            }
        ]);

        return { items }
    }
}
</script>