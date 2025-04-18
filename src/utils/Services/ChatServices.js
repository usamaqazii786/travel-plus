import { axiosInstance } from '../AxiosInstance'

export const HandleChatPost = async (id, message, selectedImage, setChannelname, changeActiveChat) => {
  try {
    const currentDate = new Date()
    const formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    })}`
    const chat = new FormData()
    if (message) chat.append('message', message)
    chat.append('attachment', selectedImage)
    chat.append('subadmin_id', id)
    chat.append('time', formattedDateTime)
    const response = await axiosInstance.post('/admin/chat/store', chat)

    if (response.data.status === true) {
      setChannelname(response?.data?.channelName)
      changeActiveChat(id)
      
    }
  } catch (error) {
    console.log(error)
  }
}
export const HandleChatPostSubadmin = async (id, message, selectedImage, setChannelname, changeActiveChat) => {
  try {
    const currentDate = new Date()
    const formattedDateTime = `${currentDate.toISOString().split('T')[0]} ${currentDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    })}`
    const chat = new FormData()
    if (message) chat.append('message', message)
    chat.append('attachment', selectedImage)
    chat.append('admin_id', 1)
    chat.append('time', formattedDateTime)
    const response = await axiosInstance.post('/subadmin/chat/store', chat)

    if (response.data.status === true) {
      setChannelname(response?.data?.channelName)
      changeActiveChat(1)
    }
  } catch (error) {
    console.log(error)
  }
}

export const EditTutorialsService = async (data, navigate, showNotification, setloading, id) => {
  setloading(true)
  try {
    const Tutorials = new FormData()
    data?.tutorials?.forEach((tutorial, index) => {
      Tutorials.append(`title[${index}]`, tutorial?.title)
      if (typeof tutorial.video?.[0] !== 'string') {
        Tutorials.append(`video[${index}]`, tutorial?.video?.[0])
      }
    })

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
export const getAllChatadmin = async (userId, setActiveChat) => {
  // setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/chat/messages/${userId}`)
    if (response) {
      // setloading(false)
      setActiveChat(response.data.data.reverse())
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllChatsubadmin = async (userId, setActiveChat) => {
  // setloading(true)
  try {
    const response = await axiosInstance.get(`/subadmin/chat/messages/${userId}`)
    if (response) {
      // setloading(false)
      setActiveChat(response.data.data.reverse())
    }
  } catch (error) {
    console.log(error)
  }
}
export const getAllChatadminList = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get(`/admin/chat/list`)
    if (response) {
      setloading(false)
      setdata(response.data.chats)
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
export const TutorialsDelete = async (setloading, id, showNotification) => {
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
      // getAllTutorialss(setdata, setloading)
    }
  } catch (error) {
    console.log(error)
  }
}
