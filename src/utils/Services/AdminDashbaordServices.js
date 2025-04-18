import { axiosInstance } from "../AxiosInstance";

export const GetAllAdminData = async (setData,setloading) => {
  setloading(true);
  try {
    const response = await axiosInstance.get(`/admin/weekly/record/count`);
    setData(response.data?.data);
    setloading(false);
  } catch (error) {
    console.error(error);
    setloading(false);
  }
};