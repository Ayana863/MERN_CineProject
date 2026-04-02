import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import Profile from "../assets/ProfileImg.png";
import UserProfileModal from "./UserProfileModal";
import { logoutAPI, updateUser } from "../services/Allapi";
import { useDispatch, useSelector } from "react-redux";
import { ClearHistory } from "../Slice/Historyslice";
import { ClearFavorites } from "../Slice/Favorites";
import { logout, setAuth } from "../Slice/authSlice"
import { toast } from "react-toastify"


function Navbar({ isLandingPage }) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // get user from redux
  const user = useSelector((state) => state.auth.user)

  const isHome = location.pathname === "/home"
  const isHistory = location.pathname === "/history"
  const isFavorites = location.pathname === "/favorites"
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register"

  const [menuOpen, setMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  


// UPDATE USER
const handleUpdate = async (formData) => {
  try {
    const res = await updateUser(formData)

    const updatedUser = res.user
    const token = localStorage.getItem("token")

    localStorage.setItem("user", JSON.stringify(updatedUser))

    dispatch(setAuth({ user: updatedUser, token }))

    toast.success("Profile updated successfully")
    setShowModal(false)

    return res
  } catch (err) {
    console.log("Update error:", err)
  }
}
  //  LOGOUT
  const handleLogout = async () => {
    try {
      await logoutAPI()

      localStorage.clear()

      dispatch(ClearHistory())
      dispatch(ClearFavorites())
      // redux clear
      dispatch(logout()) 

      navigate("/login")
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-50 bg-gradient-to-br from-[#274c77] via-black to-[#001233] px-6 py-5">
        <div className="flex items-center justify-between">

          {/* logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Cine<span className="text-amber-500">Scope</span>
          </Link>

          {/* desktop menu  */}
          {!isLandingPage && !isAuthPage && (
            <div className="hidden md:flex items-center gap-8">

              {!isHome && !isHistory && !isFavorites && <Search />}

              <NavLink to="/home" className="text-white">
                Home
              </NavLink>

              <NavLink to="/favorites" className="text-white">
                <FaRegHeart className="text-red-400 text-xl" />
              </NavLink>

              <NavLink to="/history" className="text-white">
                WatchHistory
              </NavLink>

              {/* user profile */}
              {user ? (
                <div
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-lg cursor-pointer"
                >
                 <img
  src={user?.profilePic || Profile}
  alt="profile"
  className="w-9 h-9 rounded-full border-2 border-amber-500 object-cover"
  onError={(e) => (e.target.src = Profile)}
/>
                  <span className="text-white text-sm">{user.name}</span>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Login
                    </button>
                  </Link>

                  <Link to="/register">
                    <button className="px-4 py-2 bg-amber-500 text-black rounded-lg">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}

          {/* mobile menu */}
          {!isLandingPage && !isAuthPage && (
            <button
              className="md:hidden text-white text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}

          {/* SIGN IN */}
          {(isLandingPage || isAuthPage) && (
            <Link to="/login">
              <button className="px-5 py-2 rounded-lg bg-amber-500 text-black font-semibold">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* profile modal */}
      {showModal && user && (
        <UserProfileModal
          user={user}
          onClose={() => setShowModal(false)}
          onLogout={handleLogout}
          onUpdate={handleUpdate}
        />
      )}
    </>
  )
}

export default Navbar