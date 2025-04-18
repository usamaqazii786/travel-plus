'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  useNavigate,
  //  useSearchParams
} from 'react-router-dom'
import * as yup from 'yup'
import { useAuthContext } from '@/context/useAuthContext'
import { useNotificationContext } from '@/context/useNotificationContext'
// import httpClient from '@/helpers/httpClient'
import { axiosInstance } from '../../../../utils/AxiosInstance'
const useSignIn = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { saveSession } = useAuthContext()
  // const [searchParams] = useSearchParams()
  const { showNotification } = useNotificationContext()
  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  })
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: 'admin@weedowl.com',
      password: '12345678',
    },
  })
  // const redirectUser = () => {
  //   const redirectLink = searchParams.get('redirectTo')
  //   if (redirectLink){navigate('/dashboard/agents')} else navigate('/')
  // }
  const login = handleSubmit(async (values) => {
    setLoading(true)
    try {
      const formdata = new FormData()
      for (let key in values) {
        formdata.append(key, values[key])
      }
      formdata.append('type', 'admin')
      const response = await axiosInstance.post('/login', formdata)
      if (response?.data?.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
        // localStorage.setItem('Token', response.data.data.access_token)
        setLoading(false)
        saveSession({ ...response.data.data })

        navigate('/dashboard/agents')
        showNotification({
          message: 'Successfully logged in....',
          variant: 'success',
        })
      }
      console.log(response)
    } catch (error) {
      console.log(error)
      showNotification({
        message: error.response.data.message,
        variant: 'error',
      })
    }
  })
  return {
    loading,
    login,
    control,
  }
}
export default useSignIn
