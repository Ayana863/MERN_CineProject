import { createSlice } from "@reduxjs/toolkit";


const savedReview = JSON.parse(localStorage.getItem("reviews")) || []

const userreviews = createSlice({
  name: "reviews",
  initialState: {
    value: savedReview
  },
  reducers: {
    addUserReview: (state, action) => {
      state.value.push(action.payload)
      localStorage.setItem("reviews", JSON.stringify(state.value))
    },
    deleteUserReview: (state, action) => {
      state.value = state.value.filter(review => review.id !== action.payload)
      localStorage.setItem("reviews", JSON.stringify(state.value)) 
    }
  }
});

export const { addUserReview, deleteUserReview } = userreviews.actions
export default userreviews.reducer
