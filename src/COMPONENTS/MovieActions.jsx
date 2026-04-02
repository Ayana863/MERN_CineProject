import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddToFav, RemoveFromFavorites } from "../Slice/Favorites"
import { AddToHistory } from "../Slice/Historyslice"
import SimilarMovies from "./SimilarMovies"
import { useNavigate } from "react-router-dom"
import { IoIosClose } from "react-icons/io"
import { toast } from "react-toastify"
import { getRatingsAPI } from "../services/ratingAPI"

function MovieModal({ movie, onClose, setMovieCard }) {
  const [trailerUrl, setTrailerUrl] = useState(null)
  const [showSimilar, setShowSimilar] = useState(false)

  const [avgRating, setAvgRating] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)

  const dispatch = useDispatch()
  const FavoritesItems = useSelector(state => state.favorites.value)
  const { token } = useSelector(state => state.auth)

  const navigate = useNavigate()

  if (!movie) return null

  //  reset when movie changes
  useEffect(() => {
    setTrailerUrl(null)
    setShowSimilar(false)
  }, [movie])

  // fetch rating
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await getRatingsAPI(movie._id)
        setAvgRating(res.data?.averageRating || 0)
        setTotalRatings(res.data?.totalRatings || 0)
      } catch (err) {
        console.log(err)
      }
    }

    if (movie?._id) fetchRatings()
  }, [movie])

  const handleWatchMovie = () => {
    if (!movie.videoUrl) {
      toast.warning("Trailer not available")
      return
    }

    setTrailerUrl(movie.videoUrl)

    dispatch(AddToHistory({
      _id: movie._id,
      title: movie.title,
      poster: movie.poster,
      watchedAt: new Date().toISOString()
    }))
  }

  const toggleFavorite = () => {
    if (!token) {
      toast.error("Please login to add favorites")
      return
    }

    const exists = FavoritesItems.find(item => item._id === movie._id)

    if (exists) dispatch(RemoveFromFavorites(movie._id))
    else dispatch(AddToFav({
      _id: movie._id,
      title: movie.title,
      poster: movie.poster
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex justify-center items-start py-10">
      <div className="bg-gray-900 text-white w-full max-w-5xl rounded-xl p-6 relative">

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-5xl"
        >
          <IoIosClose />
        </button>

        {trailerUrl ? (
          <iframe
            className="w-full h-96 rounded"
            src={trailerUrl}
            allowFullScreen
          />
        ) : (
          <>
            <div className="flex gap-6">

              <img
                src={movie.poster}
                className="w-48 rounded"
              />

              <div>
                <h2 className="text-3xl font-bold">{movie.title}</h2>

                <p className="text-gray-400 mt-2">
                  {movie.description || "No description"}
                </p>

                <p className="mt-2">⭐ {avgRating} / 5</p>

                <div className="flex gap-3 mt-5">

                  <button onClick={handleWatchMovie} className="bg-red-500 px-4 py-2 rounded">
                    Watch
                  </button>

                  <button onClick={toggleFavorite} className="bg-black border px-4 py-2 rounded">
                    Favorite
                  </button>

                  <button
                    onClick={() => setShowSimilar(!showSimilar)}
                    className="bg-blue-500 px-4 py-2 rounded"
                  >
                    Similar Movies
                  </button>
                </div>
              </div>
            </div>

            {/* pass props */}
            {showSimilar && (
              <SimilarMovies
                movieId={movie._id}
                setMovieCard={setMovieCard}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MovieModal