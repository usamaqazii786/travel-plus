import * as Yup from 'yup'

export const validationSchema = Yup.object({
  agent_name: Yup.string().required('Agent name is required'),
  agent_email: Yup.string().email('Invalid email address').required('Email is required'),
  agent_phone: Yup.string().required('Agent phone number is required'),
  reservation_number: Yup.string().required('Reservation number is required'),
  confirm_reservation_number: Yup.string()
    .oneOf([Yup.ref('reservation_number'), null], 'Reservation numbers must match')
    .required('Please confirm the reservation number'),
  client_name: Yup.string().required('Client name is required'),
  category_id: Yup.number().required('Supplier is required'),
  gross_commision: Yup.number().required('Gross Commission is required').positive('Gross Commission must be a positive number'),
  confirm_gross_commision: Yup.number()
    .oneOf([Yup.ref('gross_commision'), null], 'Gross commissions must match')
    .required('Please confirm the gross commission'),
  agent_commision: Yup.number().required('Agent Commission is required').positive('Agent Commission must be a positive number'),
})
export const validationSchemaforadmin = Yup.object({
  agent_name: Yup.string(),
  agent_email: Yup.string(),
  agent_phone: Yup.string(),
  reservation_number: Yup.string(),
  confirm_reservation_number: Yup.string(),
  client_name: Yup.string(),
  category_id: Yup.number(),
  gross_commision: Yup.number(),
  confirm_gross_commision: Yup.number(),
  agent_commision: Yup.number(),
})
