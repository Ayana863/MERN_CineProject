import React, { useEffect, useRef, useState } from "react"
import { getAdminMoviesAPI } from "../services/adminApi"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { useDispatch, useSelector } from "react-redux"
import { AddToFav, RemoveFromFavorites } from "../Slice/Favorites"
import { AddToHistory } from "../Slice/Historyslice"
import { IoIosClose } from "react-icons/io"
import { toast } from "react-toastify"

function SimilarMovies() {
  const [movies, setMovies] = useState([])
  const [playingVideo, setPlayingVideo] = useState(null)
  const scrollRef = useRef(null)

  const dispatch = useDispatch()

  const FavoritesItems = useSelector(state => state.favorites.value)
  const { token } = useSelector(state => state.auth)

  //fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getAdminMoviesAPI()

        console.log("API RESPONSE:", res)

        setMovies(res.data || [])
      } catch (err) {
        console.log("Failed to load movies", err)
        setMovies([])
      }
    }

    fetchMovies()
  }, [])

  // favorites
  const toggleFavorite = (movie) => {
    const exists = FavoritesItems.find(item => item._id === movie._id)

    if (exists) {
      dispatch(RemoveFromFavorites(movie._id))
    } else {
      dispatch(AddToFav({
        _id: movie._id,
        title: movie.title,
        poster: movie.poster,
      }))
    }
  }

  // play movie
  const playMovie = (movie) => {

    // not logged in
    if (!token) {
      toast.error("Please login to watch movie")
      return
    }

    // play videos
    if (movie.videoUrl) {
      setPlayingVideo(movie.videoUrl)

      dispatch(AddToHistory({
        _id: movie._id,
        title: movie.title,
        poster: movie.poster,
        watchedAt: new Date().toISOString()
      }))
    } else {
      toast.warning("No trailer available")
    }
  }

  // scroll
  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" })

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" })

  // empty?
  if (!Array.isArray(movies) || movies.length === 0)
    return <p className='text-gray-300 mt-4'>No movies found.</p>

  return (
    <div className='relative py-6'>


      <div className='flex justify-between px-6 mb-4'>
        <h2 className='text-white text-2xl font-bold'>Related Movies</h2>

        <div className='flex gap-2'>
          <button onClick={scrollLeft} className='bg-black text-white p-2 rounded-full'>
            <FaChevronLeft />
          </button>
          <button onClick={scrollRight} className='bg-black text-white p-2 rounded-full'>
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* movie list*/}
      <div ref={scrollRef} className='flex gap-x-6 px-6 overflow-hidden'>

        {movies.map(movie => (
          <div key={movie._id} className='min-w-[180px] bg-black rounded-xl shadow-xl hover:scale-105 transition relative'>

            {/* favorite */}
            <button
              onClick={() => toggleFavorite(movie)}
              className='absolute top-2 right-2 bg-black p-1 rounded-full'
            >
              <CiHeart
                className={`text-3xl ${FavoritesItems.find(item => item._id === movie._id)
                    ? "text-red-500"
                    : "text-white"
                  }`}
              />
            </button>

            {/* img */}
            <img
              src={movie.poster}
              alt={movie.title}
              className='w-full h-72 object-cover rounded-t-xl cursor-pointer'
              onClick={() => playMovie(movie)}
            />

            {/* info*/}
            <div className="p-3">
              <h3 className='text-white text-sm font-semibold truncate'>
                {movie.title}
              </h3>

              <span className='text-yellow-400 text-xs'>
                ⭐ {movie.rating || "N/A"}
              </span>


              <button
                onClick={() => playMovie(movie)}
                className='w-full mt-3 bg-red-600 text-white py-1 rounded hover:bg-red-700 transition'
              >
                Watch Movie
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* video modal */}
      {playingVideo && (
        <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
          <div className='relative w-[90%] md:w-[60%]'>

            <button
              onClick={() => setPlayingVideo(null)}
              className='absolute -top-10 right-0 text-white text-2xl'
            >
              <IoIosClose />
            </button>

            <iframe
              className="w-full h-96 rounded-lg"
              src={playingVideo}
              allowFullScreen
              title="Movie Trailer"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SimilarMovies