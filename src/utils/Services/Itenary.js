import { axiosInstance } from '../AxiosInstance'

export const GetllItenary = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/itineraries')
    if (response) {
      const data = response?.data.data
      const options = data.map((e) => ({
        value: e.intinerary?.id,
        label: e?.title,
      }))
      setloading(false)
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllIt = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/itineraries')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllsingleitenary = async (setdata, setloading, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/single/commission/${id}`)
    if (response) {
      const data = response?.data.data

      setloading(false)
      setdata(data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const DeleteItineraries = async (setloading, id, showNotification, setdata, setloadingIt) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/itineraries/delete/${id}`)
    if (response?.data?.status === true) {
      setloading(false)
      showNotification({
        message: response.data.message,
        variant: 'success',
      })
      getAllIt(setdata, setloadingIt)
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
export const EditItenary = async (data, showNotification, id, setloading, navigate, keyName) => {
  setloading(true)
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
    const TripImage = data?.quoteHeader?.[11]?.trip_image

    if (typeof TripImage !== 'string' && typeof TripImage !== 'undefined') {
      formData.append(`trip_image`, TripImage)
    }

    formData.append('_method', 'PUT')
    await axiosInstance.post(`/subadmin/itineraries/${id}`, formData).then((response) => {
      if (response?.data?.response) {
        showNotification({ message: response?.data?.response, variant: 'success' })
        setloading(false)
        navigate(-1)
      }
    })
  } catch (error) {
    showNotification({ message: error?.response?.data?.message, variant: 'error' })
    setloading(false)
  }
}
