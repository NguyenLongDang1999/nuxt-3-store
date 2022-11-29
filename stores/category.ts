import { CategoryListOutput } from './../utils/interface'

export const useCategoryStore = defineStore('category', {
    state: () => ({ categoryList: [] as CategoryListOutput[] }),
    actions: {
        async getList (params?: any) {
            const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : ''
            const { data } = await useFetchGetData('category?' + queryParams)
            this.categoryList = data?.value?.data
            return data?.value?.aggregations
        },
        async create (req: object) {
            const result = await useFetchPostData('category/create', {
                body: req,
                initialCache: false
            })

            return result
        }
    }
})
