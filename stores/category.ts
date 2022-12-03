import {
    CategoryListInput,
    CategoryListOutput
} from './../utils/interface'

export const useCategoryStore = defineStore('category', {
    state: () => ({ categoryList: [] as CategoryListOutput[] }),
    actions: {
        async getList (params?: any) {
            const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : ''
            const { data: category } = await useFetchGetData(ROUTE.CATEGORY + '?' + queryParams)
            this.categoryList = category.value?.data ?? []
            return category.value?.aggregations ?? 0
        },
        async create (req: CategoryListInput) {
            const result = await useFetchPostData(ROUTE.CATEGORY, { body: req })
            return result
        },
        async update (req: CategoryListInput) {
            const result = await useFetchPostData(ROUTE.CATEGORY + '/' + req.id, { body: req }, METHOD.PATCH)
            return result
        },
        async remove (id: string) {
            const result = await useFetchPostData(ROUTE.CATEGORY + '/' + id, {}, METHOD.DELETE)
            return result
        }
    }
})
