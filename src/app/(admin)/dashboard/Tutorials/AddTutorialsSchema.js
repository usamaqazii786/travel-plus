
import * as Yup from 'yup'

export const validationSchema = Yup.object({
    tutorials:Yup.array().of(
        Yup.object({
            title: Yup.string().required('Tutorials Name is required'),
            video: Yup.string().required('Tutorials video is required'),
        }),
    ),

})
