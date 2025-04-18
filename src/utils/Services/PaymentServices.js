import { axiosInstance } from '../AxiosInstance'

export const AddpaymentService = async (data, navigate, showNotification, setloading, reminderDate) => {
  setloading(true)
  try {
    const formData = new FormData()
    formData.append('itinerary_id', data?.itinerary_id)
    formData.append('reminder_date', reminderDate)
    formData.append('reminder_time', data?.reminder_time)
    formData.append('notification', data?.notification)
    const response = await axiosInstance.post('/subadmin/payment_notification', formData)
    if (response.data.status === true) {
      showNotification({
        message: 'payment Created....',
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
export const EditpaymentService = async (data, navigate, showNotification, setloading, reminderDate, id) => {
  setloading(true)
  try {
    const formData = new FormData()
    // formData.append('itinerary_id', data?.travelItinerary)

    formData.append('itinerary_id', data?.itinerary_id)
    formData.append('_method', 'Put')
    formData.append('reminder_date', reminderDate)
    formData.append('reminder_time', data?.reminder_time)
    // formData.append('reminder_time', '06:30:00');
    formData.append('notification', data?.notification)

    const response = await axiosInstance.post(`/subadmin/payment_notification/${id}`, formData)
    if (response.data.status === true) {
      showNotification({
        message: 'payment Created....',
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
export const AddpaymentServiceIt = async (data, handleClose, showNotification, setloading, id,setdata,setloadingGet) => {
  setloading(true)
  const today = new Date().toISOString().split('T')[0]
  try {
    const formData = new FormData()
    // formData.append('itinerary_id', data?.travelItinerary)

    formData.append(`itinerary_id`, id)
    formData.append(`payment_amount`, data?.amount)
    formData.append(`descriptition`, data?.description)
    formData.append(`date`, today)
    const response = await axiosInstance.post(`/subadmin/itineraries_payment`, formData)
    if (response.data.status === true) {
      showNotification({
        message: 'payment Craeted....',
        variant: 'success',
      })
      setloading(false)
      getAllpaymentsItineries(setdata, setloadingGet, id)
      handleClose() 
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
export const getAllpayments = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/payment_notification')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllCountry = async (setCountries, setSelectedCountry) => {
  try {
    fetch('https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries)
        setSelectedCountry(data.userSelectValue)
      })
  } catch (error) {
    console.log(error)
  }
}
export const getAllpaymentsItineries = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/itineraries_payment?itinerary_id=${id}`)
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllpaymentsInformation = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/payment/information/${id}`)
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const AddPaymentEmail = async (data, reset, swal, setloading, clientId, itineraryId) => {
  setloading(true)
  try {
    const formData = new FormData()
    formData.append('client_id', clientId)
    formData.append('travel_quote_id', itineraryId)
    data.forEach((e, index) => {
      formData.append(`card_number[${index}]`, e.card_number)
      formData.append(`cvc_code[${index}]`, e.cvc_code)
      formData.append(`expiry_date[${index}]`, e.expiry_date)
      formData.append(`state[${index}]`, e.state)
      formData.append(`country[${index}]`, e.country)
      formData.append(`zip_code[${index}]`, e.zip_code)
      formData.append(`card_name[${index}]`, e.card_name)
      formData.append(`billing_address[${index}]`, e.billing_address)
    })

    const responses = await axiosInstance.post('/subadmin/payment/information', formData)
    const { response } = responses.data
    if (responses.data.status === true) {
      reset()
      swal.fire(response, '', 'success')
      setloading(false)
    } else {
      reset()
      swal.fire(response, '', 'error')
      setloading(false)
    }
  } catch (error) {
    console.log(error)
    reset()
    setloading(false)
    swal.fire(error.responses.data.message, '', 'error')
  }
}
export const PaymentDelete = async (setloading, id, showNotification, navigate) => {
  setloading(true)
  try {
    const response = await axiosInstance.delete(`/subadmin/payment_notification/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: 'Payment Information [or info] Deleted…',
        variant: 'success',
      })
      navigate(-1)
    }
  } catch (error) {
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
    console.log(error)
  }
}
