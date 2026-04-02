import React, { useEffect, useRef, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { CiHeart } from "react-icons/ci"
import { LiaStarSolid } from "react-icons/lia"
import { AddToFav, RemoveFromFavorites } from "../Slice/Favorites"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getAllMoviesAPI, } from "../services/Allapi"
import MovieModal from "./MovieModal"
import { getRatingsAPI } from "../services/ratingAPI"

function PopularMovies() {
  const [popular, setPopular] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const scrollRef = useRef(null)

  const user = JSON.parse(localStorage.getItem("user"))
  const isAuth = !!user

  const FavoritesItems = useSelector(state => state.favorites.value)
  const dispatch = useDispatch()

  // fetch movies + ratings
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await getAllMoviesAPI()
        const moviesArray = Array.isArray(data) ? data : data.data

        const popularMovies = moviesArray.filter(movie =>
          movie.category?.includes("popular")
        )

        const moviesWithRatings = await Promise.all(
          popularMovies.map(async movie => {
            try {
              const res = await getRatingsAPI(movie._id)

              console.log("Rating:", res.data)

              return {
                ...movie,
                avgRating: res.data?.averageRating || 0,
                totalRatings: res.data?.totalRatings || 0
              }
            } catch {
              return {
                ...movie,
                avgRating: 0,
                totalRatings: 0
              }
            }
          })
        )

        setPopular(moviesWithRatings)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPopularMovies()
  }, [])

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" })
  }

  const toggleFavorite = movie => {
    if (!isAuth) {
      toast.warning("Please login first")
      return
    }

    const exists = FavoritesItems.find(
      item => String(item.id) === String(movie._id)
    )

    if (exists) {
      dispatch(RemoveFromFavorites(movie._id))
    } else {
      dispatch(
        AddToFav({
          id: movie._id,
          title: movie.title,
          poster: movie.poster
        })
      )
    }
  }

  return (
    <>
      <div className="relative py-6">

        {/* header */}
        <div className="flex justify-between px-6 mb-4">
          <h2 className="text-white text-2xl font-bold">
            Popular Movies
          </h2>

          <div className="flex gap-2">
            <button onClick={scrollLeft} className="bg-black p-2 text-white rounded-full">
              <FaChevronLeft />
            </button>
            <button onClick={scrollRight} className="bg-black p-2 text-white rounded-full">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* movies */}
        <div ref={scrollRef} className="flex gap-x-6 px-6 overflow-hidden">
          {popular.map(movie => {

            const isFav = FavoritesItems.find(
              item => String(item.id) === String(movie._id)
            )

            return (
              <div key={movie._id} className="relative min-w-[180px] bg-[#0b132b] rounded-xl shadow-xl hover:scale-105 transition">

                {/* favorite */}
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`absolute top-2 right-2 p-1 rounded-full 
                  ${!isAuth ? "opacity-50 bg-black" : "bg-black hover:text-red-500"}`}
                >
                  <CiHeart className={`text-3xl ${isFav ? "text-red-500" : "text-white"}`} />
                </button>

                {/* poster */}
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-72 object-cover rounded-t-xl"
                />

                {/* content */}
                <div className="p-3">
                  <h3 className="text-white text-sm truncate">
                    {movie.title}
                  </h3>

                  <p className="text-gray-400 text-xs mt-1">
                    {movie.genre?.join(", ")}
                  </p>

                  {/*  rating */}
                  {movie.totalRatings > 0 ? (
                    <div className="flex items-center gap-2 mt-2">
                      <LiaStarSolid className="text-amber-400 text-lg" />
                      <span className="text-amber-400 text-sm font-semibold">
                        {movie.avgRating.toFixed(1)} / 5
                      </span>
                      <span className="text-gray-400 text-xs">
                        ({movie.totalRatings})
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-xs mt-2">
                      No ratings yet
                    </p>
                  )}

                  <button
                    onClick={() => setSelectedMovie(movie)}
                    className="w-full mt-3 bg-amber-500 text-black py-1 rounded"
                  >
                    Read More
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  )
}

export default PopularMovies