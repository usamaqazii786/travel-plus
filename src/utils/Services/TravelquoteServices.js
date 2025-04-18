
import { axiosInstance } from '../AxiosInstance'


export const AddclientService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const client = new FormData()
    data.clients.forEach((item, index) => {
      client.append(`member_name[${index}]`, item.member)
      client.append(`age[${index}]`, item?.age)
    })
    client.append(`address`, data?.address)
    client.append(`phone`, data?.phone)
    client.append(`notes`, data?.agentNotes)
    client.append(`email`, data?.email)
    client.append(`family_name`, data?.familyname)

    const response = await axiosInstance.post('/subadmin/client', client)
    if (response.data.status === true) {
      showNotification({
        message: 'client Created....',
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

export const EditclientService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const client = new FormData()
    data.clients.forEach((item, index) => {
      client.append(`member_name[${index}]`, item.member)
      client.append(`age[${index}]`, item?.age)
    })
    client.append(`address`, data?.address)
    client.append(`phone`, data?.phone)
    client.append(`notes`, data?.agentNotes)
    client.append(`email`, data?.email)
    client.append(`family_name`, data?.familyname)

    client.append('_method', 'Put')
    const response = await axiosInstance.post(`/subadmin/client/${id}`, client)
    if (response.data.status === true) {
      showNotification({
        message: 'client Edit....',
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
export const SendOtpTravel = async (setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/quote/otp`)
    if (response) {
      setloading(false)
      return response.data
    }
  } catch (error) {
    setloading(false)
    console.log(error)
  }
}
export const verifyOtpAndFetchAvatar = async (otp) => {
  try {
    const formdata = new FormData()
    formdata.append('otp', otp)

    const response = await axiosInstance.post(`/subadmin/verify_otp`, formdata)
    if (response) {
      console.log(response)
      return response.data
      // setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllTravel = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/travel_quote')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getSingleTravel = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/single_travel_quote/${id}`)
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const handleOtpInput = (swal, setdata) => {
  swal
    .fire({
      title: 'An OTP code has been sent to your accounts email. Please enter it below to continue.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (otp) => {
        return verifyOtpAndFetchAvatar(otp)
      },
      allowOutsideClick: () => !swal.isLoading(),
    })
    .then((result) => {
      if (result) {
        if (result.value) {
          setdata(result.value?.status)
          swal.fire({
            title: `${result.value.response}`,
          })
        } else {
          swal.fire({
            title: 'Error',
            text: 'how to find the Otp/Payment Key',
          })
        }
      }
    })
    .catch((error) => {
      console.error('Error in OTP process:', error)
      swal.fire({
        title: 'Error',
        text: 'There was an issue with the OTP verification process.',
        icon: 'error',
      })
    })
}
export const SendEmailTravel = async (setloading, id, showNotification) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/travel_quote/pdf/send_email/${id}`)
    if (response?.data?.status === true) {
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
export const SendEmailTravelTesting = async (setloading, id, showNotification) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/travel_quote/pdf/send_email/agent/${id}`)
    if (response?.data?.status === true) {
      setloading(false)
      showNotification({
        message: response.data.message,
        variant: 'success',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
export const EditTravel = async (data, setaddloading, showNotification, id, navigate, keyName) => {
  setaddloading(true)
  try {
    const formData = new FormData()
    keyName.forEach((key) => {
      if (['addon', 'flight', 'ticket', 'traveler'].includes(key)) {
        if (data[key]) {
          data[key].forEach((item, index) => {
            Object.keys(item).forEach((fieldKey) => {
              if (item[fieldKey] !== undefined && item[fieldKey] !== '') {
                if (key === 'addon') {
                  formData.append(`add_on[${index}][${fieldKey}]`, `${item[fieldKey]}`)
                } else {
                  formData.append(`${key}[${index}][${fieldKey}]`, `${item[fieldKey]}`)
                }
              }
            })
          })
        }
      } else {
        if (data[key]) {
          data[key].forEach((alldata) => {
            Object.keys(alldata).forEach((keys) => {
              if (alldata[keys] !== undefined && alldata[keys] !== '' && keys !== 'trip_image') {
                formData.append(keys, alldata[keys])
              }
            })
          })
        }
      }
    })
    if (typeof data?.quoteHeader?.[11]?.trip_image !== 'string') {
      formData.append(`trip_image`, data?.quoteHeader?.[11]?.trip_image)
    }
    formData.append('is_draft', 0)
    formData.append(`_method`, `put`)

    await axiosInstance.post(`/subadmin/travel_quote/${id}`, formData).then((response) => {
      if (response?.data?.response) {
        showNotification({ message: response?.data?.response, variant: 'success' })
        setaddloading(false)
        navigate(-1)
      }
    })
  } catch (error) {
    setaddloading(false)
    showNotification({ message: error?.response?.data?.message, variant: 'error' })

    console.error(error)
  }
}
export const AddTravel = async (data, setaddloading, showNotification, navigate, keyName, isSave) => {
  setaddloading(true)

  try {
    const formData = new FormData()

    keyName.forEach((key) => {
      if (['addon', 'flight', 'ticket', 'traveler'].includes(key)) {
        if (data[key]) {
          data[key].forEach((item, index) => {
            Object.keys(item).forEach((fieldKey) => {
              if (item[fieldKey] !== undefined && item[fieldKey] !== '') {
                if (key === 'addon') {
                  formData.append(`add_on[${index}][${fieldKey}]`, `${item[fieldKey]}`)
                } else {
                  formData.append(`${key}[${index}][${fieldKey}]`, `${item[fieldKey]}`)
                }
              }
            })
          })
        }
      } else {
        if (data[key]) {
          data[key].forEach((alldata) => {
            Object.keys(alldata).forEach((keys) => {
              if (alldata[keys] !== undefined && alldata[keys] !== '') {
                formData.append(keys, alldata[keys])
              }
            })
          })
        }
      }
    })

    isSave ? formData.append('is_draft', 1) : formData.append('is_draft', 0)

    await axiosInstance.post(`/subadmin/travel_quote`, formData).then((response) => {
      if (response?.data?.response) {
        showNotification({ message: response?.data?.response, variant: 'success' })
        setaddloading(false)
        navigate(-1)
      }
    })
  } catch (error) {
    showNotification({ message: error?.response?.data?.message, variant: 'error' })
    setaddloading(false)
  }
}
export const Convert = async (setconvertloading, showNotification, id, navigate) => {
  setconvertloading(true)
  try {
    await axiosInstance.get(`/subadmin/convert/itineraries/${id}`).then((response) => {
      if (response?.data?.response) {
        setconvertloading(false)
        showNotification({ message: response?.data?.response, variant: 'success' })
        navigate('/agentdashboard/itineraries')
      }
    })
  } catch (error) {
    showNotification({ message: error?.response?.data?.message, variant: 'error' })
    setconvertloading(false)
    console.error(error)
  }
}
export const PaymentDelete = async (setloading, id, showNotification, navigate) => {
  setloading(true)
  try {
    const response = await axiosInstance.delete(`/subadmin/payment/information/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
      navigate('/agentdashboard/travel')
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
export const DeleteTravelQuote = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.delete(`/subadmin/travel_quote/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
      getAllTravel(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
    setloading(false)
  }
}
export const FilterTravelQuote = async (data, startdata, enddata, showNotification, setloadingfilter, setdata, checkbothdate, setmessage) => {
  setloadingfilter(true)
  const FormDatas = new FormData()
  if (checkbothdate) {
    FormDatas.append('travel_start_date', startdata)
    FormDatas.append('travel_end_date', enddata)
  }
  // FormData.append('cat',startdata)
  // FormData.append('travel_start_data',startdata)

  try {
    const response = await axiosInstance.post(`/subadmin/search_travel_quote`, FormDatas)
    if (response?.data) {
      setmessage(response.data.message)
      setdata(response.data.data)
      setloadingfilter(false)
      if (response?.data?.data?.length === 0) {
        showNotification({
          message: 'No Travel found',
          variant: 'error',
        })
      } else {
        showNotification({
          message: response.data.message,
          variant: 'success',
        })
      }
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const FilterItenaryQuote = async (data, startdata, enddata, showNotification, setloadingfilter, setdata, checkbothdate) => {
  setloadingfilter(true)
  const FormDatas = new FormData()
  if (checkbothdate) {
    FormDatas.append('travel_start_date', startdata)
    FormDatas.append('travel_end_date', enddata)
  }
  // FormData.append('cat',startdata)
  // FormData.append('travel_start_data',startdata)

  try {
    const response = await axiosInstance.post(`/subadmin/search_travel_quote`, FormDatas)
    if (response?.data?.status) {
      setdata(response.data.data)
      setloadingfilter(false)
      if (response?.data?.data?.length === 0) {
        showNotification({
          message: 'No Travel found',
          variant: 'error',
        })
      } else {
        showNotification({
          message: 'Travel Quote found',
          variant: 'success',
        })
      }
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const FilterTravelQuoteClient = async (data, startdata, enddata, showNotification, setloadingfilter, setdata) => {
  setloadingfilter(true)

  const FormDatas = new FormData()
  if (data?.client_id) {
    FormDatas.append('id', 23)
  }
  // FormData.append('cat',startdata)
  // FormData.append('travel_start_data',startdata)

  try {
    const response = await axiosInstance.post(`/subadmin/search_by_client`, FormDatas)
    if (response?.data?.status === true) {
      setdata(response.data.data)
      setloadingfilter(false)
      if (response?.data?.data?.length === 0) {
        showNotification({
          message: 'No Travel found',
          variant: 'error',
        })
        return 0
      } else {
        showNotification({
          message: 'Travel Quote found',
          variant: 'success',
        })
      }
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
