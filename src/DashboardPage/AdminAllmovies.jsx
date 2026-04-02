import React, { useEffect, useState } from "react";
import {getAdminMoviesAPI,deletedMovieAPI, updateMovieAPI,} from "../services/adminApi";

const AdminAllmovies = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  //  Edit State
  const [editMovie, setEditMovie] = useState(null)

  // Convert YouTube URL
  const convertToEmbed = (url) => {
    if (!url) return ""
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    const match = url.match(regExp)
    return match ? `https://www.youtube.com/embed/${match[1]}` : url
  }
  // Fetch Movies
  const fetchMovies = async () => {
    try {
      const res = await getAdminMoviesAPI()
      setMovies(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return
    await deletedMovieAPI(id)
    setMovies((prev) => prev.filter((movie) => movie._id !== id))
  }

  //  Open Edit
  const handleEdit = (movie) => {
    setEditMovie({
      ...movie,
      category: movie.category?.[0] || "",
      genre: movie.genre?.[0] || "",
    })
  }

  //  Input Change
  const handleChange = (e) => {
    setEditMovie({ ...editMovie, [e.target.name]: e.target.value })
  }
  // Update
 const handleUpdate = async () => {
  try {
    const payload = {
      ...editMovie,
      // convert to array 
      category: [editMovie.category], 
      genre: [editMovie.genre],       
      videoUrl: convertToEmbed(editMovie.videoUrl),
    }

    await updateMovieAPI(editMovie._id, payload)

    setMovies((prev) =>
      prev.map((m) => (m._id === editMovie._id ? payload : m))
    )

    setEditMovie(null)
  } catch (err) {
    console.error(err)
  }
}

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Movie Management
          </h2>

          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
            Total: {movies.length}
          </div>
        </div>

        <div className="border-b mb-4"></div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-gray-400">No movies found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">

              <thead className="text-xs uppercase bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-center">Poster</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Genre</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id} className="border-b hover:bg-gray-50">

                    <td className="px-6 py-4 flex justify-center">
                      <img
                        src={movie.poster}
                        className="w-16 h-24 rounded shadow"
                        alt=""
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {movie.title}
                    </td>

                    <td className="px-6 py-4">
                      {movie.category?.join(", ")}
                    </td>

                    <td className="px-6 py-4">
                      {movie.genre?.join(", ")}
                    </td>

                    <td className="px-6 py-4 text-center space-x-2">

                      {/*  EDIT */}
                      <button
                        onClick={() => handleEdit(movie)}
                        className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg text-sm"
                      >
                        Edit
                      </button>

                      {/*  DELETE */}
                      <button
                        onClick={() => handleDelete(movie._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/*  edit modal */}
      {editMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

            <h3 className="text-lg font-bold mb-4">Edit Movie</h3>

            <input
              name="title"
              value={editMovie.title}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
              placeholder="Title"
            />

            <input
              name="poster"
              value={editMovie.poster}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
              placeholder="Poster URL"
            />

            <input
              name="category"
              value={editMovie.category}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
              placeholder="Category"
            />

            <input
              name="genre"
              value={editMovie.genre}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
              placeholder="Genre"
            />

            <input
              name="videoUrl"
              value={editMovie.videoUrl}
              onChange={handleChange}
              className="border p-2 w-full mb-2 rounded"
              placeholder="YouTube URL"
            />

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => setEditMovie(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAllmovies