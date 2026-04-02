import React, { useEffect, useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { useOutletContext } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddToFav, RemoveFromFavorites } from '../Slice/Favorites'
import { ToastContainer, toast } from 'react-toastify'
import { getAllMoviesAPI } from '../services/Allapi'
import { getRatingsAPI } from '../services/ratingAPI' 
import { LiaStarSolid } from 'react-icons/lia' 

function Drama() {
  const { setMovieCard } = useOutletContext()
  const [drama, setDrama] = useState([])
  const [ratings, setRatings] = useState({}) 

  const searchValue = useSelector(state => state.search.value)
  const FavoritesItems = useSelector(state => state.favorites.value)
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const isAuth = !!token

  // FETCH MOVIES
  useEffect(() => {
    const fetchDramaMovies = async () => {
      try {
        const res = await getAllMoviesAPI()

        const moviesArray = res?.data || res || []

        const dramaMovies = moviesArray.filter(movie =>
          movie.genre?.some(g => g.toLowerCase() === "drama")
        )

        setDrama(dramaMovies)

        // FETCH RATINGS
        fetchRatings(dramaMovies)

      } catch (err) {
        console.log(err)
      }
    }

    fetchDramaMovies()
  }, [])

  //  FETCH RATINGS FUNCTION
  const fetchRatings = async (movies) => {
    const data = {}

    for (let movie of movies) {
      try {
        const res = await getRatingsAPI(movie._id)

        data[movie._id] = {
          avg: res.data?.averageRating || 0,
          total: res.data?.totalRatings || 0
        }

      } catch (err) {
        data[movie._id] = {
          avg: 0,
          total: 0
        }
      }
    }

    setRatings(data)
  }

  //  SEARCH
  const filteredDrama = drama.filter(movie =>
    (movie.title || '').toLowerCase().includes(searchValue.toLowerCase())
  )

  //  FAVORITE
  const toggleFavorite = (movie) => {
    if (!isAuth) {
      toast.warning("Please login first")
      return
    }

    const exists = FavoritesItems.find(
      item => String(item._id) === String(movie._id)
    )

    if (exists) {
      dispatch(RemoveFromFavorites(movie._id))
      toast.info("Removed from favorites")
    } else {
      dispatch(AddToFav({
        _id: movie._id,
        title: movie.title,
        poster: movie.poster,
        rating: movie.rating
      }))
      toast.success("Added to favorites")
    }
  }

  return (
    <>
      <h2 className='mt-4 text-white font-bold text-3xl px-6'>
        Drama
      </h2>

      {filteredDrama.length === 0 && (
        <p className='text-center text-gray-400 mt-20'>
          No Drama movies found
        </p>
      )}

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-7 p-10'>
        {filteredDrama.map(movie => {

          const isFav = FavoritesItems.find(
            item => String(item._id) === String(movie._id)
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

                {/* FAV BUTTON */}
                <button
                  onClick={() => toggleFavorite(movie)}
                  disabled={!isAuth}
                  className={`absolute top-2 right-2 bg-black p-1 rounded-full transition 
                  ${!isAuth
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-red-500"
                    }`}
                >
                  <CiHeart
                    className={`text-3xl ${isFav ? "text-red-500" : "text-white"}`}
                  />
                </button>
              </div>

              <p className='text-white mt-3 font-semibold truncate'>
                {movie.title}
              </p>

              {/*  RATING */}
              <div className='mt-2'>
                <p className='text-amber-400 text-sm font-semibold flex items-center gap-1'>
                  <LiaStarSolid />
                  {ratingData.avg ? ratingData.avg.toFixed(1) : 0} / 5
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

export default Drama