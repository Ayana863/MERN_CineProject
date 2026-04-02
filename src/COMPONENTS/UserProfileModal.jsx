import React, { useEffect, useState } from "react"
import Profile from "../assets/ProfileImg.png"

const UserProfileModal = ({ user, onClose, onLogout, onUpdate }) => {
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setName(user?.name || "")
  }, [user])

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [image])

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Name is required")
      return
    }

    const formData = new FormData()
    formData.append("name", name)

    if (image) {
      formData.append("profilePic", image)
    }

    try {
      setLoading(true)
      await onUpdate(formData)

      setEditMode(false)
      setImage(null)
      setPreview(null)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-80 text-white">

        <h2 className="text-xl text-amber-500 text-center mb-4">
          User Profile
        </h2>

        {editMode ? (
          <>
            <img
              src={preview || user?.profilePic || Profile}
              className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-amber-500 object-cover"
            />

            <input type="file" onChange={handleImageChange} className="mb-3" />

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-3 bg-gray-800 rounded"
              placeholder="Enter name"
            />

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-amber-500 py-2 rounded mb-2"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <>
            <img
              src={user?.profilePic || Profile}
              className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-amber-500 object-cover"
            />

            <p className="text-center mb-3">{user?.name}</p>

            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-blue-600 py-2 rounded mb-2"
            >
              Edit Profile
            </button>
          </>
        )}

        <button
          onClick={onLogout}
          className="w-full bg-red-500 py-2 rounded mb-2"
        >
          Logout
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-600 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default UserProfileModal