import { apiclient } from "./axiosConfig";

export const addMovieAPI = (data) =>
  apiclient.post("/admin/add-movie", data)

export const updateMovieAPI = (id, data) =>
  apiclient.patch(`admin/update/${id}`, data)

export const deleteMovieAPI = (id) =>
  apiclient.delete(`/delete/${id}`)


export const getMoviesAPI = () =>
  apiclient.get("/movies")


//  ADMIN USERS API
export const getUsersAPI = async () => {
  const res = await apiclient.get('/admin/users')
  return res.data
}


export const getAdminMoviesAPI = async () => {
  const res = await apiclient.get('/admin/movies') 
  return res.data
}


export const deletedMovieAPI = async (id) => {
  return await apiclient.delete(`/admin/delete/${id}`)
}


// Get all users
export const getAllUsersAPI = async () => {
  return await apiclient.get("/admin/users/all-users")
};

// Delete a user
export const deleteUserAPI = async (id) => {
  return await apiclient.delete(`/admin/users/delete/${id}`)
}

// Block / Unblock user
export const blockUserAPI = async (id) => {
  return await apiclient.patch(`/admin/users/block/${id}`)
}

export const getUserStatsAPI = async () => {
  return await apiclient.get("/admin/users/stats")
}