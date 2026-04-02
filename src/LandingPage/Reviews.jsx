import React from 'react';
import { useSelector } from 'react-redux'
import { BsFillBalloonHeartFill } from "react-icons/bs";

function Reviews() {
  const reviews = useSelector(state => state.reviews.value)

  return (
    <section className='py-24 bg-[#001d3d] min-h-screen'>
      <div className='max-w-6xl mx-auto px-6 text-center'>

        <h2 className='text-4xl text-amber-400 font-bold flex items-center justify-center gap-3'>
          Loved by Movie Fans
          <BsFillBalloonHeartFill className='text-red-500' />
        </h2>

        <p className='text-gray-400 mt-6 max-w-3xl mx-auto'>
          See what our users say about discovering movies with CineScope.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-14'>

          {reviews.length === 0 ? (
            <p className='text-gray-300 col-span-full'>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className='bg-gray-500 backdrop-blur-xl border border-black p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                  hover:shadow-amber-500/20 hover:-translate-y-2 transition-all duration-300'>
                <h4 className='mt-2 font-semibold text-lg'>{review.userName}</h4>
                <p className='text-amber-400 mt-1'>
                  {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                </p>
                <p className='text-gray-300 mt-4'>{review.comment}</p>
  
              </div>
            ))
          )}

        </div>
      </div>
    </section>
  )
}

export default Reviews
