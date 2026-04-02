import axios from "axios";

export const apiclient = axios.create({
    baseURL: "https://cinescope-backend-1.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }

})
apiclient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")


  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
