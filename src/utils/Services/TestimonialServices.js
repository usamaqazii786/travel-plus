import { axiosInstance } from '../AxiosInstance'

export const AddTestimonialService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Testimonial = new FormData()
    Object.keys(data)?.map((key) => {
      if (data[key] !== '') {
        Testimonial.append(key, data[key])
      }
    })

    const response = await axiosInstance.post(`/admin/testimonial_section/store`, Testimonial)
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
export const EditTestimonialService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Testimonial = new FormData()
    Object.keys(data)?.forEach((key) => {
      if (data[key] !== '' && key !== 'image') {
        Testimonial.append(key, data[key])
      }
    })
    if (typeof data?.image !== 'string') {
      Testimonial.append('image', data.image)
    }
    const response = await axiosInstance.post(`/admin/testimonial_section/update/${id}`, Testimonial)
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
export const getAllTestimonial = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/testimonial_section/view`)
    if (response.data?.status === true) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllTestimonialoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Testimonial/view')
    if (response) {
      setloading(false)
      const Testimonial = response.data.data
      const options = Testimonial.map((e) => ({
        value: e.id,
        label: e?.Testimonial_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const TestimonialDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Testimonial/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllTestimonial(setdata, setloading)
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
