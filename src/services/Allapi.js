import { apiclient } from "./axiosConfig"

export const userRegister=async(data)=>{
const response=await apiclient.post('/auth/register',data)
return response.data
}
export const userLogin = async (data) => {
  const response = await apiclient.post("/auth/login", data)
  return response.data
}
export const updateUser = async (formData) => {
  const response = await apiclient.patch("/auth/update", formData)
  return response.data
}

export const logoutAPI = async () => {
  return await apiclient.post("/auth/logout")
}
// users
export const getAllMoviesAPI = async () => {
  const response = await apiclient.get("/admin/client/movie")
  return response.data
}
