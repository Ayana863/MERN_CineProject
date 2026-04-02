import { createSlice } from "@reduxjs/toolkit"

const userFromStorage = JSON.parse(localStorage.getItem("user"))
const tokenFromStorage = localStorage.getItem("token")

const initialState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },

    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer