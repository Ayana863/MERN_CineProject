
import { createSlice } from "@reduxjs/toolkit"

const savedFav = JSON.parse(localStorage.getItem("favorites")) || []

export const favSlice = createSlice({
  name: "Favorites",
  initialState: {
    value: savedFav
  },
  reducers: {

AddToFav: (state, action) => {
  const newItem = {
    ...action.payload,
    _id: action.payload._id || action.payload.id
  }

  const exist = state.value.find(item =>
    item._id === newItem._id
  )

  if (!exist) {
    state.value.unshift(newItem)
  }

  localStorage.setItem("favorites", JSON.stringify(state.value))
},
RemoveFromFavorites: (state, action) => {
  state.value = state.value.filter(movie =>
    movie._id !== action.payload && movie.id !== action.payload
  )

  localStorage.setItem("favorites", JSON.stringify(state.value))
},

 


    ClearFavorites: (state) => {
      state.value = []
      localStorage.setItem("favorites", JSON.stringify([]))
    }
  }
})

export const { AddToFav, RemoveFromFavorites, ClearFavorites } = favSlice.actions
export default favSlice.reducer