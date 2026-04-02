import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const AdminNavbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    //  token remove
    localStorage.removeItem("token") 
    localStorage.removeItem("user")  

    navigate("/register") 
  }
  return (
    <div className="bg-black text-white flex justify-between px-6 py-4">
      <h1 className="text-2xl font-bold">🎬 CineScope</h1>

      <div className="flex gap-4 items-center">
        <button className="hover:text-gray-300"><Link to={'/admin-dashboard'}>Dashboard</Link></button>
        <button className="hover:text-gray-300"><Link to={'/admin-user'}>Users</Link></button>
        <button className="hover:text-gray-300"><Link to={'/admin-movie'}>Movies</Link></button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminNavbar