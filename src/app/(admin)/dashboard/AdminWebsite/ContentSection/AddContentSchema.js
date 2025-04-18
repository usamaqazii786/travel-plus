import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  title: yup.string(),
  page: yup.string(),
  content: yup.string(),
  // image: yup.mixed(),
})
