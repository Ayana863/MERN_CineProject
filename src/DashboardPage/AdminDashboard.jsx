import React, { useState } from "react"
import { addMovieAPI } from "../services/adminApi"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AdminDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    poster: "",
    category: "",
    genre: "",
    videoUrl: "",
    releaseDate: "",
    description: "",
  })

  const [error, setError] = useState("")

  //  Convert YouTube URL to embed
  const convertToEmbed = (url) => {
    if (!url) return ""
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    const match = url.match(regExp)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }

  //  Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  //  Submit Movie
  const handleSubmit = async () => {
    try {
      setError("")

      if (!form.title || !form.category) {
        setError("Title & Category are required")
        return
      }

      const payload = {
        ...form,
        videoUrl: convertToEmbed(form.videoUrl),
      }

      await addMovieAPI(payload)

      toast.success("🎬 Movie added successfully!")

      // Reset form
      setForm({
        title: "",
        poster: "",
        category: "",
        genre: "",
        videoUrl: "",
        releaseDate: "",
        description: "",
      })

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <ToastContainer />

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          🎬 Admin Dashboard
        </h1>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <div className="grid grid-cols-2 gap-4">

          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Movie Title"
            className="border p-3 rounded-lg"
          />

          {/* POSTER */}
          <input
            name="poster"
            value={form.poster}
            onChange={handleChange}
            placeholder="Poster URL"
            className="border p-3 rounded-lg"
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Category</option>
            <option value="trending">Trending</option>
            <option value="popular">Popular</option>
            <option value="toprated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
          </select>

          {/* GENRE */}
          <select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Select Genre</option>
            <option value="action">Action</option>
            <option value="drama">Drama</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="horror">Horror</option>
            <option value="thriller">Thriller</option>
          </select>

          {/* RELEASE DATE */}
          <input
            type="date"
            name="releaseDate"
            value={form.releaseDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {/* VIDEO URL */}
          <input
            name="videoUrl"
            value={form.videoUrl}
            onChange={handleChange}
            placeholder="YouTube Trailer URL"
            className="border p-3 rounded-lg"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Movie Description"
            className="border p-3 rounded-lg col-span-2"
          />
        </div>

        {/* PREVIEW SECTION */}
        <div className="mt-6 space-y-4">

          {/* POSTER PREVIEW */}
          {form.poster && (
            <div className="text-center">
              <p className="font-semibold">Poster Preview</p>
              <img
                src={form.poster}
                alt="poster"
                className="w-32 mx-auto rounded-lg shadow"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
              />
            </div>
          )}

          {/* TRAILER PREVIEW */}
          {form.videoUrl && (
            <div>
              <p className="text-center font-semibold">Trailer Preview 🎥</p>
              <iframe
                className="w-full h-52 rounded-lg shadow"
                src={convertToEmbed(form.videoUrl)}
                title="preview"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg mt-6 font-semibold"
        >
           Add Movie
        </button>
      </div>
    </div>
  )
}

export default AdminDashboard