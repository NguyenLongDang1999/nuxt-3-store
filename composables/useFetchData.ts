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

export const useFetchPutFile = async (path: string, body: object) => {
    return await $fetch(`${config.public.bunnyCdnURL}/image/${path}`, {
        method: METHOD.PUT,
        headers: {
            'content-type': 'application/octet-stream',
            AccessKey: config.public.bunnyAccessKey
        },
        body
    })
}
