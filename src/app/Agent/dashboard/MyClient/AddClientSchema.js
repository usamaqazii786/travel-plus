import * as Yup from 'yup'

export const validationSchema = Yup.object({
  clients: Yup.array().of(
    Yup.object({
      member: Yup.string().required('Member is required'),
      age: Yup.string(),
    }),
  ),
  familyname: Yup.string().required('Family Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Please enter a number without any dashes or symbols')
    .required('Phone number is required'),
  agentNotes: Yup.string().optional(),
})
