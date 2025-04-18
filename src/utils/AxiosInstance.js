import axios from 'axios'
// import { toast } from 'react-toastify'
import { baseURL } from './BaseUrl/BaseUrl'
import { getCookie } from 'cookies-next'
import { authSessionToken } from '../context/useAuthContext'

export const axiosInstance = axios.create({
  baseURL: baseURL,
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getCookie(authSessionToken)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    const Data = error?.response?.data
    const errors = Data.error
    if (errors) {
      //   errors.map((e) => toast.error(e))
    } else {
      // eslint-disable-next-line no-empty
      if (Data.message === 'Unauthenticated.' || Data.message.includes('No query results for model')) {
      } else {
        // toast.error(Data.message)
      }
      // eslint-disable-next-line no-empty
      if (Data.message.includes('No query results for model')) {
      } else {
        console.log(Data.message.includes('No query results for model'), Data.message, '<====!Data.message.includes("No query results for model")')
      }
    }
    if (Data.message === 'Unauthenticated.') {
      localStorage.clear()
      window.location.pathname = "/agent/login";

      localStorage.setItem('Unauthenticated', true)
    } else {
      localStorage.setItem('Unauthenticated', false)
    }
    return Promise.reject(error)
  },
)
