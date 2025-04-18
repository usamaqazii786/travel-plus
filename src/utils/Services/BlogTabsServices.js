import { axiosInstance } from '../AxiosInstance'

export const AddBlogTabService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const BlogTab = new FormData()
    Object.keys(data)?.map((key) => {
      if (data[key] !== '') {
        BlogTab.append(key, data[key])
      }
    })

    const response = await axiosInstance.post(`/admin/tab_section/store`, BlogTab)
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
export const EditBlogTabService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const BlogTab = new FormData()
    Object.keys(data)?.forEach((key) => {
      if (data[key] !== '' && key !== 'image') {
        BlogTab.append(key, data[key])
      }
    })
    if (typeof data?.image !== 'string') {
      BlogTab.append('image', data.image)
    }
    const response = await axiosInstance.post(`/admin/tab_section/update/${id}`, BlogTab)
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
export const getAllBlogTab = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/tab_section/view`)
    if (response.data?.status === true) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllBlogTaboption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/BlogTab/view')
    if (response) {
      setloading(false)
      const BlogTab = response.data.data
      const options = BlogTab.map((e) => ({
        value: e.id,
        label: e?.BlogTab_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const BlogTabDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/BlogTab/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllBlogTab(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
export const pageoption = [
  {
    value: 'Home',
    label: 'Home',
  },
  {
    value: 'Travel Services',
    label: 'Travel Services',
  },
  {
    value: 'Travel Exclusive',
    label: 'Travel Exclusive',
  },
  {
    value: 'About',
    label: 'About',
  },
  {
    value: 'Blog',
    label: 'Blog',
  },
  {
    value: 'Contact',
    label: 'Contact',
  },
]
