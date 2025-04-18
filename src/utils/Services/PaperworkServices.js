import { axiosInstance } from '../AxiosInstance'

export const AddPaperworkService = async (image, navigate, showNotification, setloading, id, setData) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Formdata.append('document_path', image)
    Formdata.append('itinerary_id', id)

    const response = await axiosInstance.post('/subadmin/itinerary/Document', Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
      getAllPaperworks(setData, setloading, id)

      setloading(false)
      // navigate(-1) // navigate to the previous page
    }
  } catch (error) {
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
    setloading(false)
  }
}

export const EditPaperworkService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Formdata.append('email', data.email)
    Formdata.append('fname', data.first_name)
    Formdata.append('lname', data.last_name)
    Formdata.append('state', data.state)
    Formdata.append('city', data.city)
    Formdata.append('zip_code', data.zip_code)
    Formdata.append('password', data.password)
    if (data.image) Formdata.append('image', data.image)
    Formdata.append('_method', 'Put')
    const response = await axiosInstance.post(`/admin/subadmins/${id}`, Formdata)
    if (response.data.status === true) {
      showNotification({
        message: 'Paperwork Edit....',
        variant: 'success',
      })
      setloading(false)
      navigate(-1) // navigate to the previous page
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const getAllPaperworks = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/itinerary/Document?itinerary_id=${id}`)
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const DeletePaperWork = async (setloading, id, showNotification, setdata, itenary_id) => {
  setloading(true)
  try {
    const response = await axiosInstance.delete(`/subadmin/itinerary/Document/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response.data?.response,
        variant: 'success',
      })
      getAllPaperworks(setdata, setloading, itenary_id)
    } else {
      showNotification({
        message: response.data?.error,
        variant: 'error',
      })
      setloading(false)
    }
  } catch (error) {
    showNotification({
      message: error?.response.data?.response,
      variant: 'error',
    })
    setloading(false)
    console.log(error)
  }
}
export const SendEmailPaperWork = async (setloading, id, showNotification) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/itinerary/document_email/${id}`)
    if (response?.data?.status === true) {
      setloading(false)
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
