import React from "react"
import heroImg from '../assets/landingImg.jpg'
import About from "../LandingPage/About"

import Footer from "../COMPONENTS/Footer"
import { useNavigate } from "react-router-dom"

function LandingPage() {
  const navigate = useNavigate()

  return (
    <>
      <div className='pt-16 text-white overflow-x-hidden'>


        <section
          className='relative min-h-[90vh] flex items-center justify-center'
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90'></div>

          {/* Content */}
          <div className='relative max-w-7xl mx-auto px-6 text-center flex flex-col items-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight'>
              Discover Movies You'll
              <span className='block text-amber-400 mt-2'>Love</span>
            </h1>

            <p className='text-gray-300 mt-6 text-base sm:text-lg md:text-xl max-w-2xl'>
              Discover trending films, personalized recommendations, and hidden gems
              curated just for you.
            </p>

            <button
              onClick={() => navigate('/home')}
              className='mt-10 px-12 py-4 bg-amber-500 text-black text-lg font-bold
                         rounded-full shadow-[0_0_30px_rgba(245,158,11,0.6)]
                         hover:scale-105 transition'
            >
              Get Explore
            </button>
          </div>
        </section>

        {/* About */}
        <About />

      
      </div>

      <Footer />
    </>
  )
}

export default LandingPage
