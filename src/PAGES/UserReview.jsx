import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUserReview, deleteUserReview } from '../Slice/ReviewSlice'
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

function UserReview() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    //   redux store
    const reviews = useSelector(state => state.reviews.value)

    const [userName, setUserName] = useState('')
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState('')

    // Submit new review
    const handleSubmit = () => {
        if (!userName || !rating || !comment) {
            alert('Please fill all fields and select a rating.')
            return
        }

        dispatch(addUserReview({
            userName,
            rating,
            comment,

        }))

        alert('Thank you for your review!')
        setUserName('')
        setRating(0)
        setComment('')
    }

    // Delete review
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?")
        if (confirmDelete) {
            dispatch(deleteUserReview(id))
        }
    }

    return (
        <div className='min-h-screen bg-[#001d3d] text-white flex flex-col items-center px-6 py-28'>

            <button
                onClick={() => navigate('/home')}
                className='mb-6 px-6 py-2 border border-white rounded-full
                         hover:bg-white hover:text-black transition'
            >
                Back to Home
            </button>
            <div className='bg-gray-600 backdrop-blur-lg p-10 rounded-2xl max-w-lg w-full shadow-lg mb-16'>
                <h2 className='text-3xl font-bold text-center text-amber-400 mb-4'>Submit Your Review</h2>


                {/* name */}
                <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className='w-full p-3 mb-4 rounded-lg bg-black outline-none'
                />

                {/*  Rating */}
                <div className='flex justify-center gap-2 mb-4'>
                    {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                            key={star}
                            size={32}
                            className={`cursor-pointer transition ${(hover || rating) >= star ? 'text-amber-400' : 'text-gray-500'
                                }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        />
                    ))}
                </div>

                <p className='text-center text-gray-300 mb-4'>
                    {rating ? `You rated: ${rating} / 5` : 'Select a rating'}
                </p>

                {/* Comment box*/}
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review"
                    className='w-full p-3 bg-black rounded-lg outline-none text-sm resize-none mb-4'
                    rows="4"
                />

                {/* Submit  */}
                <button
                    onClick={handleSubmit}
                    className='w-full mt-2 bg-amber-500 hover:bg-amber-600 transition py-3 rounded-lg font-semibold text-black'
                >
                    Submit Review
                </button>
            </div>

            {/* Display existing reviews*/}
            <div className='max-w-4xl w-full'>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    {reviews.map((review) => (
                        <div key={review.id} className='bg-gray-500 backdrop-blur-xl border border-black p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                hover:shadow-amber-500/20 hover:-translate-y-2 transition-all duration-300'>
                            <h4 className='mt-2 font-semibold text-lg'>{review.userName}</h4>
                            <p className='text-amber-400 mt-1'>
                                {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                            </p>
                            <p className='text-gray-300 mt-4'>{review.comment}</p>


                            {/* Delete  */}
                            <button
                                onClick={() => handleDelete(review.id)}
                                className='mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition'
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default UserReview
