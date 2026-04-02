import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllMoviesAPI } from '../services/Allapi'
import MovieModal from './MovieModal'   

function SearchResult() {
  const searchValue = useSelector(state => state.search.value)
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null) 

  //fetch
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMoviesAPI()
        const moviesArray = Array.isArray(data) ? data : data.data
        setMovies(moviesArray)
      } catch (err) {
        console.log(err)
      }
    }

    fetchMovies()
  }, [])

  // filter
  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(searchValue.toLowerCase())
  )

  //no result
  if (searchValue && filteredMovies.length === 0) {
    return (
      <p className='text-center text-gray-400 pt-40'>
        No movies found
      </p>
    )
  }

  return (
    <>
      <div className='pt-40 px-6'>
        <h2 className='text-white text-2xl font-bold mb-6'>
          Search Results
        </h2>

        <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>

          {filteredMovies.map(movie => (
            <div
              key={movie._id}
              onClick={() => setSelectedMovie(movie)}  
              className='bg-gray-900 rounded-lg cursor-pointer hover:scale-105 transition'
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className='h-72 w-full object-cover rounded-t-lg'
              />

              <div className='p-3'>
                <h3 className='text-white text-sm font-semibold truncate'>
                  {movie.title}
                </h3>

                <p className='text-gray-400 text-xs mt-1'>
                  {movie.genre?.join(", ")}
                </p>
              </div>
            </div>
          ))}

          
        </div>
      </div>

      {/* MODAL */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  )
}

export default SearchResult