import { axiosInstance } from '../AxiosInstance'

export const AddPromotionService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Promotion = new FormData()
    Promotion.append(`url`, data?.url)
    Promotion.append(`image`, data?.image)

    const response = await axiosInstance.post('/admin/featured/store', Promotion)
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
export const EditPromotionService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Promotion = new FormData()
    Promotion.append(`url`, data?.url)
    if (typeof data.image !== 'string' && data.image !== null) {
      Promotion.append(`image`, data?.image)
    }

    const response = await axiosInstance.post(`/admin/featured/update/${id}`, Promotion)
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
export const getAllPromotions = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('admin/featured/view')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllPromotionoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Promotion/view')
    if (response) {
      setloading(false)
      const Promotion = response.data.data
      const options = Promotion.map((e) => ({
        value: e.id,
        label: e?.Promotion_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllPromotionsOptionAssign = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/get_assiged_Promotions')
    if (response) {
      setloading(false)
      const Promotion = response.data.data
      const options = Promotion.map((e) => ({
        value: e.id,
        label: e?.Promotion_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const PromotionDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/featured/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllPromotions(setdata, setloading)
    }
  } catch (error) {
    setloading(false)
    console.log(error)
  }
}
export const AddPerimssionPromotion = async (data, close, showNotification, setloading, id, reset) => {
  setloading(true)
  try {
    const response = await axiosInstance.post(`/admin/featured/status/update/${id}`)
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
export const Featured = async (status, id, setloading, setAgent, setloadingAgent, showNotification) => {
  setloading(true)
  try {
    const formdata = new FormData()
    if (status === 'UnFeatured') {
      formdata.append('status', 'Featured')
    } else {
      formdata.append('status', 'UnFeatured')
    }

    const response = await axiosInstance.post(`/admin/featured/status/update/${id}`, formdata)
    if (response) {
      showNotification({ message: response?.data?.message, variant: 'success' })
      setloading(false)
      getAllPromotions(setAgent, setloadingAgent)
    }
  } catch (error) {
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
    setloading(false)

    console.log(error)
  }
}
