import { axiosInstance } from '../AxiosInstance'

export const AddsupplierService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const supplier = new FormData()
    supplier.append(`supplier_name`, data?.supplier_name)

    const response = await axiosInstance.post('/admin/supplier/store', supplier)
    if (response.data.status === true) {
      showNotification({
        message: response?.data?.message,
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
  }
}
export const EditsupplierService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const supplier = new FormData()
    supplier.append(`supplier_name`, data?.supplier_name)
    const response = await axiosInstance.post(`/admin/supplier/update/${id}`, supplier)
    if (response.data.status === true) {
      showNotification({
        message: response?.data?.message,
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
export const getAllsuppliers = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/supplier/view')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllsuppliersForAgent = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/get_assiged_suppliers')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllsupplieroption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/get_assiged_suppliers')
    if (response) {
      setloading(false)
      const supplier = response.data.data
      const options = supplier.map((e) => ({
        value: e.id,
        label: e?.supplier_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllsupplieroptionAdmin = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/supplier/view')
    if (response) {
      setloading(false)
      const supplier = response.data.data
      const options = supplier.map((e) => ({
        value: e.id,
        label: e?.supplier_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllsuppliersOptionAssign = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/get_assiged_suppliers')
    if (response) {
      setloading(false)
      const supplier = response.data.data
      const options = supplier.map((e) => ({
        value: e.id,
        label: e?.supplier_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const supplierDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/supplier/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllsuppliers(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
export const AddPerimssionSupplier = async (data, close, showNotification, setloading, id, reset) => {
  setloading(true)
  try {
    const website = new FormData()
    website.append('subadmin_id', id)
    data?.map((id, index) => {
      website.append(`suppliers[${index}][category_id]`, id)
    })

    const response = await axiosInstance.post('/admin/assign/supplier', website)
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
