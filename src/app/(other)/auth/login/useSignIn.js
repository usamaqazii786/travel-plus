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
      email: '',
      password: '',
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
      formdata.append('type', 'subadmin')
      const response = await axiosInstance.post('/login', formdata)
      if (response.data?.error) {
        setLoading(false)
        showNotification({ message: response.data?.error, variant: 'error' })
      }
      if (response?.data?.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data))
        localStorage.setItem('checkDepartue', response.data?.message || 'undefined')
        localStorage.setItem('checkDepartues', response.data?.message || 'undefined')
        localStorage.setItem('traveldata', JSON.stringify(response.data?.departureDetails) || 'undefined')
        // localStorage.setItem('Token', response.data.data.access_token)
        saveSession({ ...response.data.data })
        console.log(response?.data?.data)
        if (response?.data?.data?.is_w9 == 'true') {
          navigate('/agentdashboard')
        } else if(response?.data?.data?.location_status==='Yes'){
          navigate('/dashboard/w_nineform')
        }else{
          navigate('/dashboard/w_eightform')

        }
        setLoading(false)
        showNotification({
          message: 'Successfully logged in....',
          variant: 'success',
        })
      }
    } catch (error) {
      showNotification({
        message: error.response.data.message,
        variant: 'error',
      })
      setLoading(false)
      console.log(error)
    }
  })
  return {
    loading,
    login,
    control,
  }
}
export default useSignIn
