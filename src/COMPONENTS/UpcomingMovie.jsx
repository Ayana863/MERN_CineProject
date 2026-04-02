import React, { useEffect, useRef, useState } from "react"
import { getAllMoviesAPI } from "../services/Allapi"

function UpcomingMovies() {
  const [movies, setMovies] = useState([])
  const scrollRef = useRef(null)
  const isHovering = useRef(false)

  // Fetch Movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMoviesAPI()
        const moviesArray = Array.isArray(data) ? data : data.data

        const upcoming = moviesArray.filter(movie =>
          movie.category?.includes("upcoming")
        )

        setMovies(upcoming)
      } catch (err) {
        console.log(err)
      }
    }

    fetchMovies()
  }, [])

  //  Auto Scroll
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const interval = setInterval(() => {
      if (!isHovering.current) {
        container.scrollLeft += 1

        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0
        }
      }
    }, 25)

    return () => clearInterval(interval)
  }, [movies])

  return (
    <div className="py-8">
      <h2 className="text-white text-2xl font-bold px-6 mb-6">
      UPCOMING MOVIES....
      </h2>

      <div
        ref={scrollRef}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        className="flex gap-8 px-6 overflow-x-auto scrollbar-hide"
      >
        {[...movies, ...movies].map((movie, index) => (
          <div
            key={`${movie._id}-${index}`}
            className="min-w-[220px] bg-[#111827] rounded-2xl shadow-md
                       hover:scale-105 hover:shadow-xl transition duration-300"
          >
            {/* Poster */}
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-[300px] object-cover rounded-t-2xl"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="text-white text-base font-semibold truncate">
                {movie.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {movie.genre?.join(", ")}
              </p>

              <p className="text-gray-500 text-xs mt-2">
                {movie.releaseDate || "Coming Soon"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingMovies