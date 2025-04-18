/* eslint-disable valid-typeof */
import { axiosInstance } from '../AxiosInstance'

export const AddBlogService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Blog = new FormData()
    Blog.append('supplier_id', data?.supplier)
    Blog.append('title', data?.title)
    Blog.append('description', data?.description)
    if (typeof data.image !== 'string' && data.image !== null) Blog.append('image', data?.image)
    Blog.append('website_id', id)

    const response = await axiosInstance.post(`/subadmin/store/blog`, Blog)
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
export const EditBlogService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Blog = new FormData()
    Blog.append('supplier_id', data?.supplier)
    Blog.append('title', data?.title)
    Blog.append('description', data?.description)
    if (typeof data.image !== 'string' && data.image !== null) Blog.append('image', data?.image)

    const response = await axiosInstance.post(`/subadmin/update/blog/${id}`, Blog)
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
export const getAllBlog = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/view/blog/${id}`)
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllBlogoption = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/view/Blog${id}`)
    if (response) {
      setloading(false)
      const Blog = response.data.data
      const options = Blog.map((e) => ({
        value: e.id,
        label: e?.Blog_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const BlogDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Blog/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllBlog(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
