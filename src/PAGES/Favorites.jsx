import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TiDeleteOutline } from "react-icons/ti"
import { RemoveFromFavorites } from '../Slice/Favorites'
import { getRatingsAPI } from "../services/ratingAPI"
import { LiaStarSolid } from "react-icons/lia"

function Favorites() {
  const favorites = useSelector(state => state.favorites.value)
  const dispatch = useDispatch()

  //  STORE RATINGS
  const [ratings, setRatings] = useState({})

  //  FETCH RATINGS
  useEffect(() => {
    if (favorites.length > 0) {
      fetchRatings()
    }
  }, [favorites])

  const fetchRatings = async () => {
    try {
      const ratingData = {}

      await Promise.all(
        favorites.map(async (movie) => {
          const id = movie._id || movie.id

          const res = await getRatingsAPI(id)

          ratingData[id] = {
            avg: res.data.averageRating || 0,
            total: res.data.totalRatings || 0
          }
        })
      )

      setRatings(ratingData)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='min-h-screen bg-black text-white overflow-x-hidden'>

      {/* EMPTY */}
      {favorites.length === 0 && (
        <div className='flex items-center justify-center min-h-screen'>
          <p className='text-gray-400 text-xl'>
            No Favorites Yet.
          </p>
        </div>
      )}

      {/* GRID */}
      {favorites.length > 0 && (
        <div className='pt-28 px-6 max-w-7xl mx-auto'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>

            {favorites.map(movie => {
              const key = movie._id || movie.id
              const rating = ratings[key] || {}

              return (
                <div
                  key={key}
                  className='bg-gray-900 rounded-lg p-3 relative hover:scale-105 transition'
                >

                  {/*  DELETE */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()

                      const confirmRemove = window.confirm(
                        "Are you sure you want to remove this movie?"
                      )

                      if (confirmRemove) {
                        dispatch(RemoveFromFavorites(key))
                      }
                    }}
                    className='absolute top-2 right-2 bg-black/70 text-white hover:text-red-500 rounded-full p-1'
                  >
                    <TiDeleteOutline size={30} />
                  </button>

                  {/*  POSTER */}
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className='rounded-lg h-64 w-full object-cover'
                  />

                  {/* TITLE */}
                  <h3 className='mt-2 font-semibold truncate'>
                    {movie.title}
                  </h3>

                  {/*  SAME LIKE MOVIEMODAL */}
                  <p className="text-amber-400 text-xl font-semibold flex items-center gap-2">
                    <LiaStarSolid className="text-2xl" />
                    {rating.avg || 0} / 5
                  </p>


                </div>
              )
            })}

          </div>
        </div>
      )}

    </div>
  )
}

export default Favorites