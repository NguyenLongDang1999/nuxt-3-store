import {
    CategoryListInput,
    CategoryListOutput,
    CategoryListRecursive
} from './../utils/interface'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categoryList: [] as CategoryListOutput[],
        recursiveList: [] as CategoryListRecursive[]
    }),
    actions: {
        async getList (params?: any) {
            const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : ''
            const { data: category } = await useFetchGetData(ROUTE.CATEGORY + '?' + queryParams)
            this.categoryList = category.value?.data ?? []
            return category.value?.aggregations ?? 0
        },
        async create (req: CategoryListInput) {
            return await useFetchPostData(ROUTE.CATEGORY, { body: req })
        },
        async update (req: CategoryListInput) {
            return await useFetchPostData(ROUTE.CATEGORY + '/' + req.id, { body: req }, METHOD.PATCH)
        },
        async remove (id: string) {
            return await useFetchPostData(ROUTE.CATEGORY + '/' + id, {}, METHOD.DELETE)
        },
        async getRecursiveList () {
            const { data: category } = await useFetchGetData(ROUTE.CATEGORY + '/recursive')
            const recursive = []

            for (let i = 0; i < category.value.length; i++) {
                const categoryChildren = category.value[i].Category

                recursive.push({
                    key: category.value[i].id,
                    label: category.value[i].name,
                    children: [] as CategoryListRecursive[]
                })

                if (categoryChildren.length) {
                    for (let j = 0; j < categoryChildren.length; j++) {
                        // const categoryChildren2 = categoryChildren[j].Category

                        recursive[i].children.push({
                            key: categoryChildren[j].id,
                            label: categoryChildren[j].name
                        })

                        // if (categoryChildren2.length) {
                        //     for (let k = 0; k < categoryChildren2.length; k++) {
                        //         recursive[i].children[k]?.push({
                        //             key: categoryChildren2[k].id,
                        //             label: categoryChildren2[k].name
                        //         })
                        //     }
                        // }
                    }
                }
            }

            this.recursiveList = recursive
        }
    }
})
