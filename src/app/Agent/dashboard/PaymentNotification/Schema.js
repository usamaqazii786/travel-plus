import * as yup from 'yup'

export const validationSchema = yup.object({
  payment: yup.array().of(
    yup.object({
      card_number: yup.string(),

      cvc_code: yup.string(),

      expiry_date: yup.string(),
      address: yup.string(),

      second_address: yup.string().notRequired(), // Optional second address

      city: yup.string(),

      state: yup.string(),

      country: yup.string(),

      zip_code: yup.string(),

      card_name: yup.string(),

      phone: yup.string(),
    }),
  ),

  // .matches(/^[\+][0-9]{10,15}$/, 'Phone number must be in the correct format'),
})
