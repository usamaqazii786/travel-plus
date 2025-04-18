import { axiosInstance } from '../AxiosInstance'

export const AddLogoService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Logo = new FormData()
    if (typeof data.logo !== 'string' && data.logo !== null) Logo.append('logo', data?.logo)

    Logo.append('website_id', id)

    const response = await axiosInstance.post(`/subadmin/store/logo`, Logo)
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
export const EditLogoService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Logo = new FormData()
    Logo.append('email', data?.email)
    Logo.append('phone', data?.phone)
    Logo.append('location', data?.location)

    const response = await axiosInstance.post(`/admin/Logo/update/${id}`, Logo)
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
export const getAllLogo = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/view/logo/${id}`)
    if (response.data?.status===true) {
      setloading(false)
      setdata([response.data.data])
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllLogooption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Logo/view')
    if (response) {
      setloading(false)
      const Logo = response.data.data
      const options = Logo.map((e) => ({
        value: e.id,
        label: e?.Logo_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const LogoDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Logo/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllLogo(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
