import { axiosInstance } from '../AxiosInstance'

export const AddclientService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const client = new FormData()
    data.clients.forEach((item, index) => {
      client.append(`member_name[${index}]`, item.member)
      client.append(`age[${index}]`, item?.age)
    })
    client.append(`address`, data?.address)
    client.append(`phone`, data?.phone)
    client.append(`notes`, data?.agentNotes)
    client.append(`email`, data?.email)
    client.append(`family_name`, data?.familyname)

    const response = await axiosInstance.post('/subadmin/client', client)
    if (response.data.status === true) {
      showNotification({
        message: 'client Created....',
        variant: 'success',
      })
      setloading(false)
      navigate(-1) // navigate to the previous page
    }
  } catch (error) {
    console.log(error)
    setloading(false)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const EditclientService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const client = new FormData()
    data.clients.forEach((item, index) => {
      client.append(`member_name[${index}]`, item.member)
      client.append(`age[${index}]`, item?.age)
    })
    client.append(`address`, data?.address)
    client.append(`phone`, data?.phone)
    client.append(`notes`, data?.agentNotes)
    client.append(`email`, data?.email)
    client.append(`family_name`, data?.familyname)

    client.append('_method', 'Put')
    const response = await axiosInstance.post(`/subadmin/client/${id}`, client)
    if (response.data.status === true) {
      showNotification({
        message: 'client Edit....',
        variant: 'success',
      })
      setloading(false)
      navigate(-1) 
    }
  } catch (error) {
    console.log(error)
    setloading(false)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const getAllclients = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/client')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    setloading(false)
    console.log(error)
  }
}
export const getAllclientoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/client')
    if (response) {
      setloading(false)
      const client = response.data.data
      const options = client.map((e) => ({
        value: e.id,
        label: e?.family_name,
      }))
      setdata(options)
    }
  } catch (error) {
    setloading(false)
    console.log(error)
  }
}
export const ClientDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.delete(`/subadmin/client/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.response,
        variant: 'success',
      })
      getAllclients(setdata,setloading)
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
