import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { addRatingAPI } from '../services/ratingAPI'

function UserRatingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { movie } = location.state || {}

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [loading, setLoading] = useState(false)

  // get logged user
  const user = JSON.parse(localStorage.getItem("user"))

  if (!movie) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white bg-black'>
        No movie selected
      </div>
    )
  }

  //  Submit rating
  const handleSubmit = async () => {
    if (!rating) {
      alert("Please select rating ")
      return
    }

    if (!user) {
      alert("Please login first ")
      return
    }

    const userId = user._id || user.id || user.email

    if (!userId) {
      alert("User ID missing ")
      return
    }

    try {
      setLoading(true)

      const res = await addRatingAPI({
        movieId: movie._id,
        movieTitle: movie.title,
        rating,
        userId
      })

      console.log("SUCCESS:", res.data)

      alert(" Rating submitted successfully!")
      //  back to modal
      navigate(-1)

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message)
      alert(err.response?.data?.message || "Failed to submit rating")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='min-h-screen bg-[#001d3d] text-white flex flex-col items-center justify-center px-6'>

      {/*  Movie Title */}
      <h2 className='text-3xl font-bold text-amber-400 mb-6 text-center'>
        {movie.title}
      </h2>

      {/*  Rating Stars */}
      <div className='flex gap-3'>
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar
            key={star}
            size={40}
            className={`cursor-pointer transition ${(hover || rating) >= star
                ? "text-amber-400 scale-110"
                : "text-gray-500"
              }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>

      {/*  Selected */}
      <p className='mt-4 text-gray-300'>
        {rating ? `Selected: ${rating} ⭐` : "Select rating"}
      </p>

      {/*  Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-6 px-6 py-2 rounded-lg font-semibold transition ${loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-amber-500 text-black hover:bg-amber-600"
          }`}
      >
        {loading ? "Submitting..." : "Submit Rating"}
      </button>

      {/*  Cancel */}
      <button
        onClick={() => navigate(-1)}
        className='mt-4 text-sm text-gray-400 underline hover:text-white'
      >
        Cancel
      </button>

    </section>
  )
}

export default UserRatingPage