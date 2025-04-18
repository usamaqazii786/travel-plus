import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  email: yup.string(),
  phone: yup.string(),
  location: yup.string(),
})
