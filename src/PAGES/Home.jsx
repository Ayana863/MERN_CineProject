import React from 'react'
import Footer from '../COMPONENTS/Footer'
import UpcomingMovies from '../COMPONENTS/UpcomingMovie'
import { useNavigate } from 'react-router-dom'
import { FaFireFlameCurved } from "react-icons/fa6"
import { BsFillChatSquareTextFill } from 'react-icons/bs'


function Home() {

  const navigate = useNavigate()

  return (
    <>

      <div className='min-h-screen bg-gradient-to-br from-[#274c77] via-[#000] to-[#001233] text-white overflow-x-hidden'>

        {/* Upcoming Movies */}
        <div className='pt-32 md:pt-40 px-6 max-w-7xl mx-auto'>
          <UpcomingMovies />
        </div>

      </div>


      <div className='px-6 py-20 flex justify-center bg-gradient-to-b from-black via-gray-900 to-black'>
        <div className='max-w-4xl text-center'>

          <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight'>
            Discover Movies That Match Your Mood 🎥
          </h2>

          <p className='mt-6 text-base sm:text-lg text-gray-300'>
            Explore trending blockbusters, timeless classics, and genre-based
            movies curated just for you. Watch trailers, track history, and
            enjoy a cinematic experience like never before.
          </p>

          <div className='mt-10 flex flex-col sm:flex-row justify-center items-center gap-6'>

            {/* Trending Movies */}
            <button
              onClick={() => navigate("/trending")}
              className='flex items-center gap-3 px-10 py-4
                         bg-amber-500 text-black font-bold text-lg
                         rounded-full hover:bg-amber-600 transition shadow-lg'
            >
              <FaFireFlameCurved className='text-2xl text-red-500' />
              Trending Movies
            </button>

            {/* Genre */}
            <button
              onClick={() => navigate("/genre")}
              className='px-10 py-4 border-2 border-white text-white font-bold text-lg
                         rounded-full hover:bg-white hover:text-black transition'
            >
              Browse by Genre
            </button>

            <button
              onClick={() => navigate("/reviews")}
              className='flex items-center gap-3 px-10 py-4
                         bg-blue-600 text-white font-bold text-lg
                         rounded-full hover:bg-blue-700 transition shadow-lg'
            >
              <BsFillChatSquareTextFill className='text-2xl text-yellow-400' />
              Share Your Thoughts
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
