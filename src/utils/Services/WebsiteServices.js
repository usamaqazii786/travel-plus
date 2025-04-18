import { setWebsite } from '../../redux/slices/website'
import { axiosInstance } from '../AxiosInstance'

export const AddWebsiteService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const website = new FormData()
    website.append('title', data.title)
    website.append('url', data.url)
    website.append('phone', data.phone)
    website.append('email', data.email)
    website.append('image', data.image)

    website.append('location', data.location)

    const response = await axiosInstance.post('/admin/websites', website)
    if (response.data.status === true) {
      showNotification({
        message: response.data.message,
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
export const AddPerimssionService = async (data, close, showNotification, setloading, id, reset) => {
  setloading(true)
  try {
    const website = new FormData()
    website.append('subadmin_id', id)
    data?.map((id, index) => {
      website.append(`websites[${index}][website_id]`, id)
    })

    const response = await axiosInstance.post('/admin/assign/website', website)
    if (response.data.status === true) {
      showNotification({
        message: response.data.message,
        variant: 'success',
      })
      setloading(false)
      close()
      reset()
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
    reset()
  }
}

export const EditWebsiteService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const website = new FormData()
    website.append('title', data.title)
    website.append('url', data.url)
    website.append('phone', data.phone)
    website.append('email', data.email)
    website.append('location', data.location)
    if (typeof data.image !== 'string') {
      website.append('image', data.image)
    }

    website.append('_method', 'Put')
    const response = await axiosInstance.post(`/admin/websites/${id}`, website)
    if (response.data.status === true) {
      showNotification({
        message: response.data.message,
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
export const getAllWebsites = async (setdata, setloading, ismulti) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/websites')
    if (response) {
      const { data } = response.data

      if (ismulti) {
        const options = data?.map((e) => ({
          label: e.title,
          value: e.id,
        }))
        setdata(options)
      } else {
        setdata(data)
      }
    }
  } catch (error) {
    console.error('Error fetching websites:', error)
  } finally {
    setloading(false)
  }
}
export const getAllWebsite = async (dispatch, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/get_assiged_websites')
    if (response) {
      const { data } = response.data

      dispatch(setWebsite(data))
    }
  } catch (error) {
    console.error('Error fetching websites:', error)
  } finally {
    setloading(false)
  }
}

export const DeleteWebsite = async (setloading, id, showNotification, setwebsite) => {
  setloading(true)
  try {
    const response = await axiosInstance.delete(`/admin/websites/${id}`)
    if (response?.data?.status === true) {
      setloading(false)
      getAllWebsites(setwebsite, setloading, false)
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
