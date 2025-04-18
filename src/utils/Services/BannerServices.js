import { axiosInstance } from '../AxiosInstance'

export const AddBannerService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Banner = new FormData()
    Object.keys(data)?.map((key) => {
      if (data[key] !== '') {
        Banner.append(key, data[key])
      }
    })

    const response = await axiosInstance.post(`/admin/hero_section/store`, Banner)
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
export const EditBannerService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Banner = new FormData()
    Object.keys(data)?.forEach((key) => {
      if (data[key] !== '' && key !== 'image') {
        Banner.append(key, data[key])
      }
    })
    if (typeof data?.image !== 'string') {
      Banner.append('image', data.image)
    }

    const response = await axiosInstance.post(`/admin/hero_section/update/${id}`, Banner)
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
export const getAllBanner = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/hero_section/view`)
    if (response.data?.status === true) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllBanneroption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Banner/view')
    if (response) {
      setloading(false)
      const Banner = response.data.data
      const options = Banner.map((e) => ({
        value: e.id,
        label: e?.Banner_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const BannerDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Banner/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllBanner(setdata, setloading)
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
    value: 'Special Offer',
    label: 'Special Offer',
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
export const pageoptionblog = [
  {
    value: 'Special Offer',
    label: 'Special Offer',
  },

  {
    value: 'Blog',
    label: 'Blog',
  },
]
export const pageoptiontestimonial = [
  {
    value: 'Travel Exclusive',
    label: 'Travel Exclusive',
  },
  {
    value: 'About',
    label: 'About',
  },
]
export const specialofferoption = [
  {
    value: 'Cruise',
    label: 'Cruise',
  },
  {
    value: 'Vacation',
    label: 'Vacation',
  },
  {
    value: 'Guide Tours',
    label: 'Guide Tours',
  },
  {
    value: 'Hotel / Resort',
    label: 'Hotel / Resort',
  },
]
export const Blogoption = [
  {
    value: 'Technology',
    label: 'Technology',
  },
  {
    value: 'Guides ',
    label: 'Guides ',
  },
  {
    value: 'Travel News',
    label: 'Travel News',
  },
  {
    value: 'Insights',
    label: 'Insights',
  },
]
