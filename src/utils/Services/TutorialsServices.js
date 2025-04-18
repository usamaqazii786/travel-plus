import { axiosInstance } from '../AxiosInstance'

export const AddTutorialsService = async (data, navigate, showNotification, setloading) => {
  setloading(true)
  try {
    const Tutorials = new FormData()
    data?.tutorials?.forEach((tutorial,index) => {
      console.log(tutorial)
      Tutorials.append(`title[${index}]`, tutorial?.title)
      Tutorials.append(`video[${index}]`,  tutorial?.video?.[0])
    });

    const response = await axiosInstance.post('/admin/tutorial/store', Tutorials)
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
      message: error.response?.data?.message,
      variant: 'error',
    })
  }
}

export const EditTutorialsService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Tutorials = new FormData()
    data?.tutorials?.forEach((tutorial,index) => {
      Tutorials.append(`title[${index}]`, tutorial?.title)
      if(typeof tutorial.video?.[0] !== 'string') {
        Tutorials.append(`video[${index}]`,  tutorial?.video?.[0])
      }
    });

    const response = await axiosInstance.post(`/admin/tutorial/update/${id}`, Tutorials)
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
      message: error.response?.data?.message,
            variant: 'error',
    })
  }
}
export const getAllTutorialss = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/tutorial/view')
    if (response) {
      setloading(false)
      setdata(response.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllTutorialsoption = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/Tutorials/view')
    if (response) {
      setloading(false)
      const Tutorials = response.data.data
      const options = Tutorials.map((e) => ({
        value: e.id,
        label: e?.Tutorials_name,
      }))
      setdata(options)
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllTutorialsagent = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/subadmin/tutorial/view')
    if (response) {
      setloading(false)
      const Tutorials = response.data.data
 
      setdata(Tutorials)
    }
  } catch (error) {
    console.log(error)
  }
}
export const TutorialsDelete = async (setloading, id, showNotification, setdata) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/Tutorials/delete/${id}`)
    if (response?.data?.status === true) {
      console.log(response)
      setloading(false)
      showNotification({
        message: response?.data?.message,
        variant: 'success',
      })
      getAllTutorialss(setdata,setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
