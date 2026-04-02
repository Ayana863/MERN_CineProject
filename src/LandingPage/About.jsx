import React from 'react'


function About() {
    return (
        <>

            <section className='bg-[#000814] py-28 min-h-[90vh] '>
                <div className='max-w-6xl mx-auto px-6 text-center mt-16'>

                    <h2 className='text-4xl font-bold'>
                        Why <span className='text-amber-400'>CineScope</span>?
                    </h2>

                    <p className='text-gray-400 mt-6 max-w-3xl mx-auto'>
                        Everything you need to discover, track, and enjoy movies — in one place.
                    </p>

                    <div className="grid md:grid-cols-3 gap-10 mt-14">

                        {/* Card 1 */}
                        <div className='bg-gray-500 backdrop-blur-xl border border-black p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                                           hover:shadow-amber-500/20  hover:-translate-y-2 transition-all duration-300'>
                            <h3 className='text-2xl font-semibold text-amber-400'>
                                Smart Recommendations
                            </h3>
                            <p className='text-gray-300 mt-4 '>
                                Get personalized movie suggestions based on your watch history and taste.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className='bg-gray-500 backdrop-blur-xl border border-black p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                   hover:shadow-amber-500/20  hover:-translate-y-2 transition-all duration-300'>

                            <h3 className="text-2xl font-semibold text-amber-400">Explore Genres</h3>
                            <p className="text-gray-300 mt-4 leading-relaxed">
                                Browse Action, Comedy, Drama, Thriller, Horror and more genres easily.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className='bg-gray-500 backdrop-blur-xl border border-black p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                   hover:shadow-amber-500/20  hover:-translate-y-2 transition-all duration-300'>
                            <h3 className='text-2xl font-semibold text-amber-400'>Save Favorites</h3>
                            <p className="text-gray-300 mt-4 leading-relaxed">
                                Add movies to your favorites list and watch them anytime later.
                            </p>
                        </div>

                    </div>

                </div>
            </section>



        </>
    )
}

export default About