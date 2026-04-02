import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className='bg-gray-900 text-slate-200 py-8 '>
      <div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center'>
        {/* Logo */}
        <div>
          <h1 className='text-2xl font-bold text-white tracking-wide mb-4 md:mb-0'>
            Cine<span className='text-amber-500'>Scope</span>
          </h1>
          <p className='text-gray-400 max-w-xs'>
            Discover, track, and enjoy movies with personalized recommendations and curated genres.
          </p>
        </div>


        {/* Social Icons */}
        <div className='flex gap-4'>
          <a href="#" className='hover:text-amber-500 transition'><FaFacebook /></a>
          <a href="#" className='hover:text-amber-500 transition'><FaInstagram /></a>
          <a href="#" className='hover:text-amber-500 transition'><FaTwitter /></a>
        </div>
      </div>

      <p className='text-center text-gray-500 mt-6'>
        &copy; {new Date().getFullYear()} CineScope. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
