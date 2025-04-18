import { axiosInstance } from '../AxiosInstance'

export const AddMessageService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Message = new FormData()
    Message.append('email', data?.email)
    Message.append('phone', data?.phone)
    Message.append('location', data?.location)

    const response = await axiosInstance.post(`/subadmin/updateMessage/${id}`, Message)
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
export const EditMessageService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Message = new FormData()
    Message.append('email', data?.email)
    Message.append('phone', data?.phone)
    Message.append('location', data?.location)

    const response = await axiosInstance.post(`/admin/Message/update/${id}`, Message)
    if (response.data.status === true) {
      showNotification({
        message: response?.data?.message,
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
export const getAllMessage = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/view/user/contact/${id}`)
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllMessageoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Message/view')
    if (response) {
      setloading(false)
      const Message = response.data.data
      const options = Message.map((e) => ({
        value: e.id,
        label: e?.Message_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const MessageDelete = async (setloading, id, showNotification, setdata,websiteId) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/delete/user/contact/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllMessage(setdata, setloading,websiteId)
    }
  } catch (error) {
    console.log(error)
  }
}
