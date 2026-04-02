import { apiclient } from "./axiosConfig"

//  Add
export const addHistoryAPI = async (data) => {
  return await apiclient.post("/watch-history/add-history", data)
}

//  get history
export const getHistoryAPI = async () => {
  return await apiclient.get("/watch-history/get")
}

//  delete
export const deleteHistoryAPI = async (id) => {
  return await apiclient.delete(`/watch-history/delete/${id}`)
}

// Clear
export const clearHistoryAPI = async () => {
  return await apiclient.delete("/watch-history/clear")
}