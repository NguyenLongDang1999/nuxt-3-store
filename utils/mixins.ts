export const optionStatus = [
    {
        label: 'Hoạt động',
        icon: 'pi pi-check',
        value: STATUS.ACTIVE
    },
    {
        label: 'Không hoạt động',
        icon: 'pi pi-times',
        value: STATUS.INACTIVE
    }
]

export const optionPopular = [
    {
        label: 'Phổ biến',
        icon: 'pi pi-check',
        value: POPULAR.ACTIVE
    },
    {
        label: 'Không phổ biến',
        icon: 'pi pi-times',
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

export const slugify = (str: string) => {
    str = str.toLowerCase()
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
    str = str.replace(/(đ)/g, 'd')
    str = str.replace(/([^0-9a-z-\s])/g, '')
    str = str.replace(/(\s+)/g, '-')
    str = str.replace(/^-+/g, '')
    str = str.replace(/-+$/g, '')
    return str
}

export const getExtensionFile = (fileName: string) => fileName.split('.').pop()

export const getImageURL = (path: string, name = 'default.png') => {
    const config = useRuntimeConfig()
    return config.public.bunnyCDN + '/' + path + '/' + name
}
