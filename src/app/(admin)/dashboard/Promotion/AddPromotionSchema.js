import * as Yup from 'yup'

export const validationSchema = Yup.object({
  url: Yup.string().required('Link is required'),
  image: Yup.mixed().required('Image is required'),
})
