import * as Yup from 'yup'

export const validationSchema = Yup.object({
  agent_name: Yup.string().required('Agent name is required'),
  agent_email: Yup.string().email('Invalid email address').required('Email is required'),
  agent_phone: Yup.string().required('Agent phone number is required'),
  departure_date: Yup.string().required('Departure Date is required'),
  booking_date: Yup.string().required('Booking Date is required'),
  arrival_date: Yup.string().required('Arrival Date is required'),
  reservation_number: Yup.string().required('Reservation number is required'),
  confirm_reservation_number: Yup.string()
    .oneOf([Yup.ref('reservation_number'), null], 'Reservation numbers must match')
    .required('Please confirm the reservation number'),
  client_name: Yup.string().required('Client name is required'),
  category_id: Yup.string().required('Supplier is required'),
  gross_commision: Yup.number().required('Gross Commission is required').positive('Gross Commission must be a positive number'),
  confirm_gross_commision: Yup.number()
    .oneOf([Yup.ref('gross_commision'), null], 'Gross commissions must match')
    .required('Please confirm the gross commission'),
  agent_commision: Yup.number().required('Agent Commission is required').positive('Agent Commission must be a positive number'),
})
