import * as Yup from 'yup'

export const validationSchema = Yup.object({
  lname: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name cannot be more than 50 characters long'),

  fname: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name cannot be more than 50 characters long'),

  email: Yup.string().required('Email is required').email('Please enter a valid email address'),
  location_status: Yup.string().required('Residence is required'),
  phone: Yup.string().required('Phone Number  is required'),
  // location_status: Yup.number().required('Residence is required'),

  zip_code: Yup.string()
    .required('Zip Code is required')
    // eslint-disable-next-line no-useless-escape
    .matches(/^\+?[0-9]{1,4}([\-]?[0-9]{1,4})*$/, 'Zip code must be a valid phone number or zip code'),

  state: Yup.string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters long')
    .max(50, 'State cannot be more than 50 characters long'),

  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters long')
    .max(50, 'City cannot be more than 50 characters long'),

  password: Yup.string(),
})
