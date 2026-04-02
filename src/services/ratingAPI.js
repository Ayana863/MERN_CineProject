import { apiclient } from "./axiosConfig";

//  add
export const addRatingAPI = (data) => {
  return apiclient.post('/ratings/add', data)
}

// get
export const getRatingsAPI = (movieId) => {
  return apiclient.get(`/ratings/${movieId}`)
}