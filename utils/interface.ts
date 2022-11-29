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
    name: string
    image_uri?: string
    status: number
    popular: number
    publish: boolean
    createdAt: Date
    updatedAt: Date
}
