import { axiosInstance } from '../AxiosInstance'

export const ReportService = async (setdata, setloading) => {
  setloading(true)
  try {
    const response = await axiosInstance.get('/admin/agent/filter/report')
    if (response) {
      setloading(false)
      setdata(response.data.response)
    }
  } catch (error) {
    console.log(error)
  }
}
