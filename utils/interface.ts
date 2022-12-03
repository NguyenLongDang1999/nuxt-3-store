export interface CategoryListOutput {
    name: string
    image_uri?: string
    status: number
    popular: number
    publish: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CategoryListInput {
    id?: string
    name?: string
    parent_id?: string
    description?: string
    image_uri?: string
    status?: number | string
    popular?: number | string
    publish?: boolean | string
    meta_title?: string
    meta_keyword?: string
    meta_description?: string
}
