const config = useRuntimeConfig()

export const useFetchGetData = async (path: string) => {
    return await useFetch(`${config.public.apiBaseURL}/api/v1/${path}`)
}

export const useFetchPostData = async (path: string, { ...data }) => {
    return await $fetch(`${config.public.apiBaseURL}/api/v1/${path}`, {
        method: 'POST',
        ...data
    })
}
