import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import MovieModal from '../COMPONENTS/MovieModal'


function Genre() {
  const [movieCard, setMovieCard] = useState(null)

  const navigate = useNavigate()

  return (
    <div className='pt-28 px-6 min-h-screen bg-black text-white overflow-x-hidden'>

      <div className='max-w-7xl mx-auto'>
        <button
          onClick={() => navigate('/home')}
          className='mb-6 px-6 py-2 border border-white rounded-full
                         hover:bg-white hover:text-black transition'
        >
          Back to Home
        </button>

        {/* Horizontal Genre Bar */}
        <nav className="flex gap-6 overflow-x-auto pb-4 mb-10 border-b border-gray-700 scrollbar-hide">
          <Link className="whitespace-nowrap hover:text-amber-400 transition" to="action">Action</Link>
          <Link className="whitespace-nowrap hover:text-amber-400 transition" to="comedy">Comedy</Link>
          <Link className="whitespace-nowrap hover:text-amber-400 transition" to="drama">Drama</Link>
          <Link className="whitespace-nowrap hover:text-amber-400 transition" to="adventure">Adventure</Link>
          <Link className="whitespace-nowrap hover:text-amber-400 transition" to="horror">Horror</Link>
          <Link className="whitespace-nowrap hover:text-amber-400 transition" to="crime">Crime</Link>
          <Link className="whitespace-nowrap hover:text-amber-400 transition" to="thriller">Thriller</Link>
        </nav>

        {/* Main Content */}
        <main className='w-full'>
          <Outlet context={{ setMovieCard }} />
        </main>

      </div>

      {/* Movie Modal */}
      {movieCard && (
        <MovieModal
          movie={movieCard}
          onClose={() => setMovieCard(null)}
          setMovieCard={setMovieCard}
        />
      )}
    </div>
  )
}

export default Genre
