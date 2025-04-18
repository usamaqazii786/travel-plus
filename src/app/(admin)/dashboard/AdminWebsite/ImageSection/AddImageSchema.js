import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  image_1: yup.mixed().required('Image is required'),
  image_2: yup.mixed().required('Image is required'),
})
