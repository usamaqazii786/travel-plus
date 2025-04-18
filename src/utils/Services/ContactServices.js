import { axiosInstance } from '../AxiosInstance'

export const AddContactService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Contact = new FormData()
    Contact.append('email', data?.email)
    Contact.append('phone_no', data?.phone)
    Contact.append('location', data?.location)
    Contact.append('website_id', id)

    const response = await axiosInstance.post(`/subadmin/store/contact_us`, Contact)
    if (response.data.status === true) {
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      setloading(false)
      navigate(-1)
    }
  } catch (error) {
    setloading(false)
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const EditContactService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Contact = new FormData()
    Contact.append('email', data?.email)
    Contact.append('phone', data?.phone)
    Contact.append('location', data?.location)

    const response = await axiosInstance.post(`/admin/Contact/update/${id}`, Contact)
    if (response.data.status === true) {
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      setloading(false)
      navigate(-1) // navigate to the previous page
    }
  } catch (error) {
    setloading(false)
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const getAllContact = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/view/contact_us/${id}`)
    if (response.data?.status===true) {
      setloading(false)
      setdata([response.data.data])
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllContactoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Contact/view')
    if (response) {
      setloading(false)
      const Contact = response.data.data
      const options = Contact.map((e) => ({
        value: e.id,
        label: e?.Contact_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const ContactDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Contact/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllContact(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
