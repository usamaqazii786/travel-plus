import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  Welcome: yup.string(),
  // image: yup.mixed(),
})
