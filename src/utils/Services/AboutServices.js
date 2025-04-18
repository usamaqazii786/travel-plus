/* eslint-disable valid-typeof */
import { axiosInstance } from '../AxiosInstance'

export const AddAboutService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const About = new FormData()
    Object.keys(data)?.map((key) => {
      if (data[key] !== '') {
        About.append(key, data[key])
      }
    })
    const response = await axiosInstance.post(`/admin/about_section/store`, About)
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
export const EditAboutService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const About = new FormData()
    Object.keys(data)?.forEach((key) => {
      if (data[key] !== '' && key !== 'image') {
        About.append(key, data[key])
      }
    })
    if (typeof data?.image !== 'string') {
      About.append('image', data.image)
    }

    const response = await axiosInstance.post(`/admin/about_section/update/${id}`, About)
    if (response.data.status === true) {
      showNotification({
        message: response?.data?.message,
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
export const getAllAbout = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/about_section/view`)
    if (response.data?.status === true) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllAboutoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/About/view')
    if (response) {
      setloading(false)
      const About = response.data.data
      const options = About.map((e) => ({
        value: e.id,
        label: e?.About_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const AboutDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/About/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllAbout(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
