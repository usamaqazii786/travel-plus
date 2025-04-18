import { axiosInstance } from '../AxiosInstance'

export const AddExploreService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Explore = new FormData()
    Object.keys(data)?.map((key) => {
      if (data[key] !== '') {
        Explore.append(key, data[key])
      }
    })

    const response = await axiosInstance.post(`/admin/explore_section/store`, Explore)
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
export const EditExploreService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Explore = new FormData()
    Object.keys(data)?.forEach((key) => {
      if (data[key] !== '' && key !== 'image') {
        Explore.append(key, data[key])
      }
    })
    if (typeof data?.image !== 'string') {
      Explore.append('image', data.image)
    }
    const response = await axiosInstance.post(`/admin/explore_section/update/${id}`, Explore)
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
export const getAllExplore = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/explore_section/view`)
    if (response.data?.status===true) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllExploreoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Explore/view')
    if (response) {
      setloading(false)
      const Explore = response.data.data
      const options = Explore.map((e) => ({
        value: e.id,
        label: e?.Explore_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const ExploreDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Explore/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllExplore(setdata, setloading)
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