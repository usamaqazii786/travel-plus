
import * as Yup from 'yup'

export const validationSchema = Yup.object({
    supplier_name: Yup.string().required('Supplier Name is required'),
})
