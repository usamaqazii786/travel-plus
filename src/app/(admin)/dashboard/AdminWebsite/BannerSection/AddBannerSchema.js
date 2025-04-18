import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  page: yup.string().required('page is required'),
  text: yup.string(),
  buttonText: yup.string(),
  image: yup.mixed().required('Image is required'),
});
