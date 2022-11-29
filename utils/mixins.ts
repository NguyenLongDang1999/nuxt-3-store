export const optionStatus = [
    {
        label: 'Hoạt động',
        value: STATUS.ACTIVE
    },
    {
        label: 'Không hoạt động',
        value: STATUS.INACTIVE
    }
]

export const optionPopular = [
    {
        label: 'Phổ biến',
        value: POPULAR.ACTIVE
    },
    {
        label: 'Không phổ biến',
        value: POPULAR.INACTIVE
    }
]

export const fillFormData = (form: any) => {
    Object.keys(form).forEach((key) => {
        if (!form[key]) {
            delete form[key]
        }
    })
}
