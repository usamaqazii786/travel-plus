import { axiosInstance } from '../AxiosInstance'

export const AddCommissionService = async (data, navigate, showNotification, setloading, id, todayDate, bookingDate, arrivalDate, departureDate) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Formdata.append('today_date', todayDate)
    Formdata.append('booking_date', bookingDate)
    Formdata.append('arrival_date', arrivalDate)
    Formdata.append('itinerary_id', id)
    Formdata.append('departure_date', departureDate)
    Formdata.append('notes', data.notes)
    Formdata.append('agent_name', data.agent_name)
    Formdata.append('client_name', data.client_name)
    Formdata.append('agent_phone', data.agent_phone)
    Formdata.append('reservation_number', data.reservation_number)
    Formdata.append('confirm_reservation_number', data.confirm_reservation_number)
    Formdata.append('category_id', data.category_id)
    Formdata.append('gross_commision', data.gross_commision)
    Formdata.append('confirm_gross_commision', data.confirm_gross_commision)
    Formdata.append('agent_commision', data.agent_commision)
    Formdata.append('confirm_agent_commision', data.agent_commision)
    Formdata.append('agent_email', data.agent_email)
    Formdata.append('is_status', 'No')

    Formdata.append('is_draft', 0)
    // Formdata.append('_method', 'Put')

    const response = await axiosInstance.post(`/subadmin/commission`, Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
      setloading(false)
      navigate('/agentdashboard/itineraries')
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
export const AddCommissionSupplierService = async (
  data,
  navigate,
  showNotification,
  setloading,
  todayDate,
  bookingDate,
  arrivalDate,
  departureDate,
) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Formdata.append('today_date', todayDate)
    Formdata.append('booking_date', bookingDate)
    Formdata.append('arrival_date', arrivalDate)

    Formdata.append('departure_date', departureDate)
    Formdata.append('agent_name', data.agent_name)
    Formdata.append('notes', data.notes)
    Formdata.append('client_name', data.client_name)
    Formdata.append('agent_phone', data.agent_phone)
    Formdata.append('reservation_number', data.reservation_number)
    Formdata.append('confirm_reservation_number', data.confirm_reservation_number)
    Formdata.append('category_id', data.category_id)
    Formdata.append('gross_commision', data.gross_commision)
    Formdata.append('confirm_gross_commision', data.confirm_gross_commision)
    Formdata.append('agent_commision', data.agent_commision)
    Formdata.append('agent_email', data.agent_email)
    Formdata.append('confirm_agent_commision', data.agent_commision)
    Formdata.append('is_status', 'No')

    Formdata.append('is_draft', 0)
    // Formdata.append('_method', 'Put')

    const response = await axiosInstance.post(`/subadmin/supplier_commission_store`, Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
      setloading(false)
      navigate('/agentdashboard/commission')
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
export const ApproveCommission = async (id, setloading, setAgent, setloadingAgent, showNotification, status, value) => {
  setloading(true)
  setloadingAgent(true)
  try {
    const formdata = new FormData()
    formdata.append('status', status)
    formdata.append('internal_notes', value)
    const response = await axiosInstance.post(`/admin/commission/status/update/${id}`, formdata)
    if (response) {
      showNotification({ message: response?.data?.message, variant: 'success' })
      setloading(false)
      setloadingAgent(false)
      getAllCommissionsadmin(setAgent, setloadingAgent)
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
export const SaveCommissionService = async (
  data,
  navigate,
  showNotification,
  setloading,
  id,
  todayDate,
  bookingDate,
  arrivalDate,
  departureDate,
  check,
) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Formdata.append('today_date', todayDate)
    Formdata.append('booking_date', bookingDate)
    Formdata.append('arrival_date', arrivalDate)
    Formdata.append('itinerary_id', id)
    Formdata.append('notes', data.notes)
    Formdata.append('departure_date', departureDate)
    Formdata.append('agent_name', data.agent_name)
    Formdata.append('client_name', data.client_name)
    Formdata.append('agent_phone', data.agent_phone)
    Formdata.append('reservation_number', data.reservation_number)
    Formdata.append('confirm_reservation_number', data.confirm_reservation_number)
    Formdata.append('category_id', data.category_id)
    Formdata.append('gross_commision', data.gross_commision)
    Formdata.append('confirm_gross_commision', data.confirm_gross_commision)
    Formdata.append('agent_commision', data.agent_commision)
    Formdata.append('agent_email', data.agent_email)
    Formdata.append('confirm_agent_commission', data.agent_commision)

    Formdata.append('is_draft', 1)
    if (check !== 'cancel') {
      Formdata.append('is_status', 'Yes')
    } else {
      Formdata.append('is_status', 'No')
    }

    const response = await axiosInstance.post(`/subadmin/commission`, Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response.data.response,
        variant: 'success',
      })
      setloading(false)
      navigate('/agentdashboard/itineraries')
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

export const EditCommissionService = async (data, navigate, showNotification, setloading, id, todayDate, bookingDate, arrivalDate, departureDate) => {
  setloading(true)
  try {
    const Formdata = new FormData()
    Formdata.append('today_date', todayDate)
    Formdata.append('booking_date', bookingDate)
    Formdata.append('arrival_date', arrivalDate)
    Formdata.append('departure_date', departureDate)
    Formdata.append('agent_name', data.agent_name)
    Formdata.append('client_name', data.client_name)
    Formdata.append('agent_phone', data.agent_phone)
    Formdata.append('notes', data.notes)
    Formdata.append('confirm_reservation_number', data.confirm_reservation_number)
    Formdata.append('reservation_number', data.reservation_number)
    Formdata.append('category_id', data.category_id)
    Formdata.append('confirm_gross_commision', data.confirm_gross_commision)
    Formdata.append('gross_commision', data.gross_commision)
    Formdata.append('agent_commission', data.agent_commission)
    Formdata.append('agent_email', data.agent_email)
    Formdata.append('confirm_agent_commission', data.confirm_agent_commission)

    Formdata.append('_method', 'Put')
    const response = await axiosInstance.post(`/admin/commission/${id}`, Formdata)
    if (response.data.status === true) {
      showNotification({
        message: response?.data?.response,
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
export const getAllCommissions = async (setdata, setloading) => {
  // const url = user?.role !== 'admin' ? '/subadmin/agent/commission' : '/subadmin/commission'

  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/commission')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllCommissionsSave = async (setdata, setloading) => {
  // const url = user?.role !== 'admin' ? '/subadmin/agent/commission' : '/subadmin/commission'

  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/commission')
    if (response) {
      setloading(false)
      const filter = response.data.data.filter((e) => e?.is_draft === 1)
      setdata(filter)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllCommissionsadmin = async (setdata, setloading) => {
  // const url = user?.role !== 'admin' ? '/subadmin/agent/commission' : '/subadmin/commission'

  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/commission')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllCommissionsSupplieradmin = async (setdata, setloading) => {
  // const url = user?.role !== 'admin' ? '/subadmin/agent/commission' : '/subadmin/commission'

  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/commission')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllCommissionsSupplier = async (setdata, setloading) => {
  // const url = user?.role !== 'admin' ? '/subadmin/agent/commission' : '/subadmin/commission'

  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/commission')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllCommissionsSaveadmin = async (setdata, setloading) => {
  // const url = user?.role !== 'admin' ? '/subadmin/agent/commission' : '/subadmin/commission'

  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/commission')
    if (response) {
      setloading(false)
      const filter = response.data.data.filter((e) => e?.is_draft === 1)
      setdata(filter)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllSupplier = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/supplier/view')
    if (response) {
      setloading(false)
      const { data } = response
      const option = data?.data?.map((supplier) => {
        return { value: supplier.id, label: supplier.supplier_name }
      })
      setdata(option)
    }
  } catch (error) {
    console.log(error)
  }
}
export const CommissionDelete = async (setloading, id, showNotification) => {
  setloading(true)
  try {
    const response = await axiosInstance.delete(`/subadmin/commission/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: 'Commission deleted....',
        variant: 'success',
      })
      getAllCommissions()
    }
  } catch (error) {
    console.log(error)
    showNotification({
      message: error.response.data.message,
      variant: 'error',
    })
  }
}
export const statusoption = [
  {
    label: 'On Hold',
    value: 'Hold',
  },
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'Paid',
    value: 'Paid',
  },
  {
    label: 'Cancelled',
    value: 'Cancelled',
  },
]
