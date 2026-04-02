import { createSlice } from "@reduxjs/toolkit";


const savedHistory = JSON.parse(localStorage.getItem("watchHistory")) || []

export const HistorySlice = createSlice({
  name: "history",
  initialState: {
    value: savedHistory
  },
  reducers: {

    SetHistory: (state, action) => {
      state.value = action.payload
      localStorage.setItem("watchHistory", JSON.stringify(state.value))
    },

    //  ADD
    AddToHistory: (state, action) => {
      const index = state.value.findIndex(
        item => item._id === action.payload._id
      )

      if (index !== -1) {
        // update time if already exists
        state.value[index].watchedAt = new Date().toISOString()
      } else {
        state.value.unshift(action.payload)
      }

      // SAVE
      localStorage.setItem("watchHistory", JSON.stringify(state.value))
    },

    //  DELETE
    RemoveFromHistory: (state, action) => {
      state.value = state.value.filter(
        item => item._id !== action.payload
      )

      // SAVE
      localStorage.setItem("watchHistory", JSON.stringify(state.value))
    },

    // CLEAR
    ClearHistory: (state) => {
      state.value = []
      localStorage.setItem("watchHistory", JSON.stringify(state.value))
    }
  }
})

export const { SetHistory, AddToHistory, RemoveFromHistory, ClearHistory } = HistorySlice.actions

export default HistorySlice.reducer