import * as yup from 'yup' // Import Yup

export const validationSchema = yup.object({
  title: yup.string().required('Title is required'),
  url: yup.string().required('Website URL is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  // eslint-disable-next-line no-useless-escape
  phone: yup.string().required('Phone is required'),
  location: yup.string().required('Location is required'),
})
