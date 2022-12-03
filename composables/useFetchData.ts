const config = useRuntimeConfig()

export const useFetchGetData = async (path: string) => {
    return await useFetch(`${config.public.apiBaseURL}/${path}`)
}

export const useFetchPostData = async (path: string, { ...data }, method = METHOD.POST) => {
    return await $fetch(`${config.public.apiBaseURL}/${path}`, {
        method,
        ...data
    })
}
