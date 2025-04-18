import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  logo: yup.mixed().required('logo is required'),
})
