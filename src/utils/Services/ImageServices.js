import { axiosInstance } from '../AxiosInstance'

export const AddImageService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Image = new FormData()
    Object.keys(data)?.map((key) => {
      if (data[key] !== '') {
        Image.append(key, data[key])
      }
    })
    const response = await axiosInstance.post(`/admin/image_section/store`, Image)
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
export const EditImageService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Image = new FormData()
    if (typeof data?.image_1 !== 'string') {
      Image.append('image_1', data.image_1)
    }
    if (typeof data?.image_2 !== 'string') {
      Image.append('image_2', data.image_2)
    }

    const response = await axiosInstance.post(`/admin/image_section/update/${id}`, Image)
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
    setloading(false)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const getAllImage = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/image_section/view`)
    if (response.data?.status === true) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllImageoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Image/view')
    if (response) {
      setloading(false)
      const Image = response.data.data
      const options = Image.map((e) => ({
        value: e.id,
        label: e?.Image_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const ImageDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Image/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllImage(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
