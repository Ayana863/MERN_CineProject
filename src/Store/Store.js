import { configureStore } from "@reduxjs/toolkit"
import historyReducer from "../Slice/Historyslice"
import FavReducer from "../Slice/Favorites"
import SearchReducer from "../Slice/SearchSlice"
import ReviewReducer from "../Slice/ReviewSlice"
import authReducer from "../Slice/authSlice"


const persistedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null

const persistedToken = localStorage.getItem("token") || null

const store = configureStore({
  reducer: {
    history: historyReducer,
    favorites: FavReducer,
    search: SearchReducer,
    reviews: ReviewReducer,
    auth: authReducer, 
  },

  // Preloaded state
  preloadedState: {
    auth: {
      user: persistedUser,
      token: persistedToken,
    },
  },
})

export default store