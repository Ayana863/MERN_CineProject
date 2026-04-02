import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userLogin, userRegister } from "../services/Allapi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setAuth } from "../Slice/authSlice";



function Auth() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLogin = location.pathname === "/login"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  
  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    if (isLogin) {
      const res = await userLogin({
        email: formData.email,
        password: formData.password,
      })

      console.log("LOGIN RESPONSE:", res) 

      dispatch(setAuth({
        user: res.user,
        token: res.token,
      }))

      localStorage.setItem("token", res.token)
      localStorage.setItem("user", JSON.stringify(res.user))

      // ROLE REDIRECT
      if (res.user?.role === "admin") {
        navigate("/admin-dashboard")
      } else {
        navigate("/home")
      }

      toast.success("Login successful")
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match")
        return
      }

      await userRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      toast.success("Registered successfully")
      navigate("/login")
    }

  } catch (error) {
    console.log(error)
    toast.error(error.response?.data?.message || "Something went wrong")
  }
}

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded w-full max-w-md"
        >
          <h2 className="text-2xl text-amber-500 mb-4">
            {isLogin ? "Login" : "Register"}
          </h2>

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-2 bg-gray-800 rounded"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 bg-gray-800 rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 bg-gray-800 rounded"
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mb-2 bg-gray-800 rounded"
            />
          )}

          {!isLogin && (
            <div className="mb-3">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={handleChange}
                />
                User
              </label>

              <label className="ml-4">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={formData.role === "admin"}
                  onChange={handleChange}
                />
                Admin
              </label>
            </div>
          )}

          <button className="w-full bg-amber-500 py-2 mt-4 rounded">
            {isLogin ? "Login" : "Register"}
          </button>

          <p className="mt-4 text-center text-gray-400">
            {isLogin ? "No account? " : "Already have one? "}
            <Link
              to={isLogin ? "/register" : "/login"}
              className="text-amber-500"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </form>
      </div>

      <ToastContainer />
    </>
  )
}

export default Auth