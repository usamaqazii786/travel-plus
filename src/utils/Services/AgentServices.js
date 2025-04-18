import { axiosInstance } from '../AxiosInstance'
export const AddAgentService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        Formdata.append(key, data[key])
      }
    })
    const response = await axiosInstance.post('/admin/subadmins', Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.response,
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
    setloading(false)
  }
}
export const resetPasswordService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        Formdata.append(key, data[key])
      }
    })
    const response = await axiosInstance.post('/email/sent', Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.message,
        variant: 'success',
      })
      setloading(false)
      navigate('/agent/change-pass') // navigate to the previous page
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
export const changePasswordService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        Formdata.append(key, data[key])
      }
    })
    const response = await axiosInstance.post('/reset/password', Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.message,
        variant: 'success',
      })
      setloading(false)
      navigate('/agent/login')
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
export const CreateAgentService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    // Use Object.keys to iterate over formFields
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        Formdata.append(key, data[key])
      }
    })
    const response = await axiosInstance.post('/subadmins/register', Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
      setloading(false)
      navigate(-1) // navigate to the previous page
    }
  } catch (error) {
    // console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
    setloading(false)
  }
}
export const UpdateAgentService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Object.keys(data).forEach((key) => {
      if (key !== 'image' && data[key] !== undefined && data[key] !== null) {
        Formdata.append(key, data[key])
      }
    })
    Formdata.append('_method', 'Put')

    if (data.image !== null) Formdata.append('image', data.image)

    const response = await axiosInstance.post(`/subadmin/${id}`, Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
      localStorage.setItem('user', JSON.stringify(response.data.data))
      setloading(false)
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response?.data?.message,
      variant: 'error',
    })
    setloading(false)
  }
}
export const UpdateAgencyService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Formdata.append('subadmin_id', id)
    Formdata.append('name', data.name)
    Formdata.append('email', data.email)
    Formdata.append('term', data.term)
    Formdata.append('phone_no', data.phone_no)

    if (data.logo !== null) Formdata.append('logo', data.logo)

    const response = await axiosInstance.post(`/subadmin/saveOrUpdateSubAdminProfile`, Formdata)
    if (response.data.message) {
      showNotification({
        message: response.data.message,
        variant: 'success',
      })
      localStorage.setItem('users', JSON.stringify(response.data.data))
      setloading(false)
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response?.data?.message,
      variant: 'error',
    })

    setloading(false)
  }
}
export const EditAgentService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Object.keys(data).forEach((key) => {
      if (key !== 'image' && data[key] !== undefined && data[key] !== null) {
        Formdata.append(key, data[key])
      }
    })
    if (data.image !== null) Formdata.append('image', data.image)

    Formdata.append('_method', 'Put')
    const response = await axiosInstance.post(`/admin/subadmins/${id}`, Formdata)
    if (response.data.status === true) {
      showNotification({
        message: 'Agent Edit....',
        variant: 'success',
      })
      setloading(false)
      navigate(-1)
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
export const getAllagents = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/subadmins')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllagentsoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/subadmins')
    if (response) {
      setloading(false)
      const filter = response.data.data?.map((e) => ({
        value: e?.id,
        label: e?.fname + ' ' + e?.lname,
      }))
      setdata(filter)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllpdfwnine = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/agent/wform')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const DeleteWnine = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/agent/wform/delete/${id}`)
    if (response) {
      showNotification({
        message: response.data?.message,
        variant: 'success',
      })
      setloading(false)
      getAllpdfwnine(setdata, setloading)
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
export const getAllpdfwnineAgent = async (setdata, setloading, setpdfurl) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/w9/view')
    if (response) {
      setloading(false)
      setpdfurl(response?.data?.pdfUrl)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllpdfwEight = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/w8/view')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const DeleteWEight = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/agent/wform/delete/${id}`)
    if (response) {
      showNotification({
        message: response.data?.message,
        variant: 'success',
      })
      setloading(false)
      getAllpdfwEight(setdata, setloading)
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
export const getAllpdfwEightAgent = async (setdata, setloading, setpdfurl) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/w8/view')
    if (response) {
      setloading(false)
      setpdfurl(response?.data?.pdfUrl)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllpdfmisk = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/agent/miscform')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllpdfmiskAgent = async (setdata, setloading, setpdfurl) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/misc')
    if (response) {
      setloading(false)
      setpdfurl(response?.data?.pdfUrl)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllAgency = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/view/saveOrUpdateSubAdminProfile')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const ApproveAgent = async (id, setloading, setAgent, setloadingAgent, showNotification) => {
  setloading(true)
  try {
    const response = await axiosInstance.put(`/admin/subadmins/status/${id}`)
    if (response) {
      showNotification({ message: response?.data?.response, variant: 'success' })
      setloading(false)
      getAllagents(setAgent, setloadingAgent)
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
export const ApprovedAgent = async (id, setloading, setAgent, setloadingAgent, showNotification) => {
  setloading(true)
  try {
    const response = await axiosInstance.put(`/admin/subadmins/activate/${id}`)
    if (response) {
      showNotification({ message: response?.data?.response, variant: 'success' })
      setloading(false)
      getAllagents(setAgent, setloadingAgent)
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
export const HandlePercentage = async (e, name, id, showNotification, setloading, setAgent, setloadingAgent) => {
  try {
    setloading(true)
    const formData = new FormData()

    formData.append('percentage', e)
    formData.append('fname', name)
    formData.append('_method', 'Put')

    await axiosInstance.post(`/admin/subadmins/${id}`, formData).then((response) => {
      if (response?.data?.response) {
        showNotification({ message: response?.data?.response, variant: 'success' })
        setloading(false)
      }
      getAllagents(setAgent, setloadingAgent)
    })
  } catch (error) {
    showNotification({ message: error?.response?.data?.message, variant: 'error' })
    console.error(error)
  }
}
export const Deleteagents = async (setdata, setloading, showNotification, id) => {
  setloading(true)
  try {
    const response = await axiosInstance.delete(`/admin/subadmins/${id}`)
    if (response) {
      showNotification({ message: response?.data?.response, variant: 'success' })
      setloading(false)
      getAllagents(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
    showNotification({ message: error?.response?.data?.message, variant: 'error' })
  }
}
export const options = [
  { value: 'Yes', label: 'USA' },
  { value: 'No', label: 'Other' },
]
export const agency = [
  { value: 'MainStreet', label: 'MainStreet' },
  { value: 'Yeti Travel Co', label: 'Yeti Travel Co' },
  { value: 'other', label: 'Other' },
]

export const screenWidth = window.innerWidth
