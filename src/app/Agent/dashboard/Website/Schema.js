import * as yup from 'yup' // Import Yup

export const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    url: yup.string().url('Invalid URL format').required('Website URL is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    // eslint-disable-next-line no-useless-escape
    phone: yup.string().matches(/^[\+][0-9]{10,15}$/, 'Phone number must be in correct format').required('Phone is required'),
    location: yup.string().required('Location is required'),
  })