import React, { useEffect, useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { useOutletContext } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddToFav, RemoveFromFavorites } from '../Slice/Favorites'
import { ToastContainer, toast } from 'react-toastify'
import { getAllMoviesAPI } from '../services/Allapi'
import { getRatingsAPI } from '../services/ratingAPI' 
import { LiaStarSolid } from 'react-icons/lia'

function Action() {
  const { setMovieCard } = useOutletContext()
  const [action, setAction] = useState([])

  // store ratings for each movie
  const [ratings, setRatings] = useState({})

  const searchValue = useSelector(state => state.search.value)
  const FavoritesItems = useSelector(state => state.favorites.value)
  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem("user"))
  const isAuth = !!user

  //  FETCH MOVIES
  useEffect(() => {
    const fetchActionMovies = async () => {
      try {
        const res = await getAllMoviesAPI()
        const moviesArray = Array.isArray(res) ? res : res.data

        const actionMovies = moviesArray.filter(movie =>
          movie.genre?.some(g => g.toLowerCase() === "action")
        )

        setAction(actionMovies)

        // FETCH RATINGS FOR EACH MOVIE
        fetchRatingsForMovies(actionMovies)

      } catch (err) {
        console.log(err)
      }
    }

    fetchActionMovies()
  }, [])

  //  FETCH RATINGS FUNCTION
  const fetchRatingsForMovies = async (movies) => {
    const ratingsData = {}

    for (let movie of movies) {
      try {
        const res = await getRatingsAPI(movie._id)

        ratingsData[movie._id] = {
          avg: res.data?.averageRating || 0,
          total: res.data?.totalRatings || 0
        }

      } catch (err) {
        ratingsData[movie._id] = {
          avg: 0,
          total: 0
        }
      }
    }

    setRatings(ratingsData)
  }

  //  SEARCH
  const filteredActionMovies = action.filter(movie =>
    (movie.title || '').toLowerCase().includes(searchValue.toLowerCase())
  )

  //  FAVORITE
  const toggleFavorite = (movie) => {
    if (!isAuth) {
      toast.warning("Please login first to like a movie")
      return
    }

    const exists = FavoritesItems.find(
      item => String(item.id) === String(movie._id)
    )

    if (exists) {
      dispatch(RemoveFromFavorites(movie._id))
    } else {
      dispatch(AddToFav({
        id: movie._id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating
      }))
    }
  }

  return (
    <>
      <h2 className='mt-4 text-white font-bold text-3xl px-6'>
        Action
      </h2>

      {filteredActionMovies.length === 0 && (
        <p className='text-center text-gray-400 mt-20'>
          No Action movies found
        </p>
      )}

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-7 p-10'>
        {filteredActionMovies.map(movie => {

          const isFav = FavoritesItems.find(
            item => String(item.id) === String(movie._id)
          )

          const ratingData = ratings[movie._id] || {}

          return (
            <div
              key={movie._id}
              className='bg-gray-900 rounded-xl p-3 shadow-lg'
            >
              <div className='relative'>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className='rounded-lg w-full h-80 object-cover'
                />

                {/*FAV BUTTON*/}
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`absolute top-2 right-2 bg-black p-1 rounded-full
                    ${!isAuth ? "opacity-50 cursor-not-allowed" : "hover:text-red-500"}`}
                >
                  <CiHeart
                    className={`text-3xl ${isFav ? "text-red-500" : "text-white"}`}
                  />
                </button>
              </div>

              <p className='text-white mt-3 font-semibold truncate'>
                {movie.title}
              </p>

              {/*  RATING (same as modal) */}
              <div className='mt-2'>
                <p className='text-amber-400 text-sm font-semibold'>
                  <LiaStarSolid/> {ratingData.avg ? ratingData.avg.toFixed(1) : 0} / 5
                </p>

                <p className='text-gray-400 text-xs'>
                  {ratingData.total || 0} user{ratingData.total !== 1 && "s"}
                </p>
              </div>

              <div className='flex justify-between mt-2 text-xs'>
                <span className='text-gray-400'>
                  {movie.releaseDate || "N/A"}
                </span>
              </div>

              <button
                onClick={() => setMovieCard(movie)}
                className='w-full mt-3 bg-amber-500 text-black py-1 rounded hover:bg-amber-600'
              >
                Read More
              </button>
            </div>
          )
        })}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default Action