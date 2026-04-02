import React, { useEffect, useState } from "react";
import { getAllUsersAPI,deleteUserAPI, blockUserAPI,getUserStatsAPI,} from "../services/adminApi";

const AdminUser = () => {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    loggedInUsers: 0,
    premiumUsers: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await getAllUsersAPI()
      setUsers(res.data.data)
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const res = await getUserStatsAPI()
      setStats(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchUsers(), fetchStats()]).finally(() =>
      setLoading(false)
    )
  }, [])

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return
    await deleteUserAPI(id)
    setUsers((prev) => prev.filter((u) => u._id !== id))
    fetchStats()
  }

  // Block / Unblock user
  const handleBlock = async (id) => {
    await blockUserAPI(id)
    fetchUsers()
    fetchStats()
  }

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"> Admin Users Panel</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-lg">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-lg">
          <p className="text-gray-500">Logged In Users</p>
          <h2 className="text-2xl font-bold text-green-500">{stats.loggedInUsers}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-lg">
          <p className="text-gray-500">Premium Users</p>
          <h2 className="text-2xl font-bold text-purple-500">{stats.premiumUsers}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-lg">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold text-blue-500">₹ {stats.totalRevenue}</h2>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Users List</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-800 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-2 text-center">Profile</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2 text-center">Premium</th>
                <th className="px-4 py-2 text-center">Blocked</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 flex justify-center">
                    <img
                      src={user.profilePic || "/default-avatar.png"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2 text-center">{user.isPremium ? "✅" : "❌"}</td>
                  <td className="px-4 py-2 text-center">{user.isBlocked ? "🚫" : "✅"}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleBlock(user._id)}
                      className={`px-3 py-1 rounded-lg text-white text-sm shadow ${
                        user.isBlocked
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 rounded-lg bg-gray-500 hover:bg-gray-600 text-white text-sm shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUser