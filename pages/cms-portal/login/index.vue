<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div
            class="grid justify-content-center p-2 lg:p-0"
            style="min-width:80%"
        >
            <div
                class="col-12 xl:col-6"
                style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);"
            >
                <div
                    class="h-full w-full m-0 py-7 px-4"
                    style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));"
                >
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">
                            CMS Login
                        </div>
                    </div>

                    <div class="w-full md:w-10 mx-auto">
                        <label
                            for="email1"
                            class="block text-900 text-xl font-medium mb-2"
                        >Email</label>
                        <InputText
                            id="email1"
                            v-model="form.email"
                            type="text"
                            class="w-full mb-3"
                            placeholder="Email"
                            style="padding:1rem;"
                        />

                        <label
                            for="password1"
                            class="block text-900 font-medium text-xl mb-2"
                        >Password</label>

                        <Password
                            id="password1"
                            v-model="form.password"
                            placeholder="Password"
                            :toggle-mask="true"
                            class="w-full mb-3"
                            input-class="w-full"
                            input-style="padding:1rem"
                        />

                        <Button
                            label="Sign In"
                            class="w-full p-3 text-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false
})

const form = reactive({
    email: '',
    password: ''
})
</script>

<style lang="scss" scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>
