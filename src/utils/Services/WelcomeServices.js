import { axiosInstance } from '../AxiosInstance'

export const AddWelcomeService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Welcome = new FormData()
    Object.keys(data)?.map((key) => {
      if (data[key] !== '') {
        Welcome.append(key, data[key])
      }
    })

    const response = await axiosInstance.post(`/admin/welcome_section/store`, Welcome)
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
export const EditWelcomeService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Welcome = new FormData()
    Object.keys(data)?.map((key) => {
      if (data[key] !== '') {
        Welcome.append(key, data[key])
      }
    })
    const response = await axiosInstance.post(`/admin/welcome_section/update/${id}`, Welcome)
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
export const getAllWelcome = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/welcome_section/view`)
    if (response.data?.status === true) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllWelcomeoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Welcome/view')
    if (response) {
      setloading(false)
      const Welcome = response.data.data
      const options = Welcome.map((e) => ({
        value: e.id,
        label: e?.Welcome_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const WelcomeDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Welcome/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllWelcome(setdata, setloading)
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
