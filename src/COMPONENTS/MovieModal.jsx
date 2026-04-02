import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddToFav, RemoveFromFavorites } from "../Slice/Favorites"
import { AddToHistory } from "../Slice/Historyslice"
import SimilarMovies from "./SimilarMovies"
import { useNavigate } from "react-router-dom"
import { IoIosClose } from "react-icons/io"
import { toast } from "react-toastify"
import { getRatingsAPI } from "../services/ratingAPI"
import { LiaStarSolid } from "react-icons/lia"

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

  useEffect(() => {
    setTrailerUrl(null)
    setShowSimilar(false)
    window.scrollTo(0, 0)
  }, [movie])

  //  fetch rating
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await getRatingsAPI(movie._id)
        setAvgRating(res.data?.averageRating || 0)
        setTotalRatings(res.data?.totalRatings || 0)
      } catch (err) {
        console.log("Rating fetch error:", err)
      }
    }

    if (movie?._id) {
      fetchRatings()
    }
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
      releaseDate: movie.releaseDate,
      videoUrl: movie.videoUrl,
      watchedAt: new Date().toISOString()
    }))
  }

  const toggleFavorite = () => {
    if (!token) {
      toast.error("Please login to add favorites")
      return
    }

    const exists = FavoritesItems.find(item => item._id === movie._id)

    if (exists) {
      dispatch(RemoveFromFavorites(movie._id))
    } else {
      dispatch(AddToFav({
        _id: movie._id,
        title: movie.title,
        poster: movie.poster
      }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center overflow-y-auto px-4 py-10">
      <div className="bg-gray-900 text-white w-full max-w-5xl rounded-xl p-6 relative">

        {/* close */}
        <button
          onClick={() => {
            setTrailerUrl(null)
            onClose()
          }}
          className="absolute top-4 right-4 text-5xl hover:text-red-500 transition"
        >
          <IoIosClose />
        </button>

        {/* video or details */}
        {trailerUrl ? (
          <iframe
            className="w-full h-56 sm:h-72 md:h-96 rounded-lg"
            src={trailerUrl}
            allowFullScreen
            title="Movie Trailer"
          />
        ) : (
          <>
            {/* details */}
            <div className="flex flex-col md:flex-row gap-6">

              {/* poster */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full md:w-48 rounded-lg object-cover"
              />

              {/* content */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {movie.title}
                </h2>

                <p className="text-gray-400 mt-3 text-sm md:text-base">
                  {movie?.description?.trim()
                    ? movie.description
                    : "No description available"}
                </p>

                {/*  rating */}
                <div className="mt-4">
                  <p className="text-amber-400 text-xl font-semibold flex items-center gap-2">
                    <LiaStarSolid className="text-2xl" />
                    {avgRating ? avgRating.toFixed(1) : 0} / 5
                  </p>

                  <p className="text-gray-400 text-sm">
                    {totalRatings} user{totalRatings !== 1 && "s"}
                  </p>
                </div>

                {/* release */}
                <p className="text-gray-400 mt-2">
                  Release: {movie.releaseDate || "N/A"}
                </p>

                {/* buttons */}
                <div className="flex flex-wrap gap-4 mt-6">

                  <button
                    onClick={handleWatchMovie}
                    className="bg-red-600 px-5 py-2 rounded-full hover:bg-red-700 transition"
                  >
                    Watch Movie
                  </button>

                  <button
                    onClick={toggleFavorite}
                    className="bg-black border border-gray-600 px-5 py-2 rounded-full hover:border-white transition"
                  >
                    {FavoritesItems.find(item => item._id === movie._id)
                      ? "Remove Favorite"
                      : "Add to Favorites"}
                  </button>

                  <button
                    onClick={() => setShowSimilar(!showSimilar)}
                    className="bg-blue-600 px-5 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    {showSimilar ? "Hide Similar" : "Similar Movies"}
                  </button>

                  <button
                    onClick={() => navigate("/rate", { state: { movie } })}
                    className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Rate This Movie
                  </button>

                </div>
              </div>
            </div>

            {/* similar movies */}
            {showSimilar && (
              <div className="mt-10">
                <SimilarMovies
                  movieId={movie._id}
                  setMovieCard={setMovieCard}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MovieModal