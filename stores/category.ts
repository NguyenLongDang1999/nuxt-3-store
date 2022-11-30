import { CategoryListOutput } from './../utils/interface'

const path = 'category'

export const useCategoryStore = defineStore('category', {
    state: () => ({ categoryList: [] as CategoryListOutput[] }),
    actions: {
        async getList (params?: any) {
            const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : ''
            const { data: category } = await useFetchGetData(path + '?' + queryParams)
            this.categoryList = category.value?.data ?? []
            return category.value?.aggregations ?? 0
        },
        async create (req: object) {
            const result = await useFetchPostData(path + '/create', { body: req })
            return result
        },
        async update (req: object) {
            const result = await useFetchPostData(path + '/update', { body: req })
            return result
        }
    }
})
