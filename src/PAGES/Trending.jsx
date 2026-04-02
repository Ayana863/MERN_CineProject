import React, { useState } from 'react'
import PopularMovies from '../COMPONENTS/PopularMovies'
import TrendingMovies from '../COMPONENTS/TrendingMovies'
import TopRatedMovie from '../COMPONENTS/TopRatedMovie'
import MovieModal from '../COMPONENTS/MovieModal'
import SearchResult from '../COMPONENTS/SearchResult'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Trending() {
  const [movieCard, setMovieCard] = useState(null)
  const searchValue = useSelector(state => state.search.value)
  const navigate = useNavigate()

  const isSearching = searchValue.trim().length > 0

  return (
    <>
      <div className='min-h-screen bg-black text-white overflow-x-hidden'>

        {isSearching ? (
          <div className='pt-32 px-6 max-w-7xl mx-auto'>


            <button
              onClick={() => navigate('/trending')}
              className='mb-6 px-6 py-2 border border-white rounded-full
                         hover:bg-white hover:text-black transition'
            >
              Back to Home
            </button>

            <SearchResult setMovieCard={setMovieCard} />
          </div>
        ) : (
          <div className='pt-32 md:pt-40 px-6 max-w-7xl mx-auto space-y-20'>
            <button
              onClick={() => navigate('/home')}
              className='mb-6 px-6 py-2 border border-white rounded-full
                         hover:bg-white hover:text-black transition'
            >
              Back to Home
            </button>

            <PopularMovies setMovieCard={setMovieCard} />

            <TrendingMovies setMovieCard={setMovieCard} />

            <TopRatedMovie setMovieCard={setMovieCard} />

          </div>
        )}

      </div>

      <MovieModal
        movie={movieCard}
        onClose={() => setMovieCard(null)}
        setMovieCard={setMovieCard}
      />
    </>
  )
}

export default Trending
