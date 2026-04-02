import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { TiDeleteOutline } from "react-icons/ti"
import { RemoveFromHistory } from "../Slice/Historyslice"
import { getRatingsAPI } from "../services/ratingAPI"
import { LiaStarSolid } from "react-icons/lia" 

function WatchHistory() {
  const history = useSelector(state => state.history.value)
  const dispatch = useDispatch()

  const [video, setVideo] = useState(null)

  //  STORE AVG + COUNT
  const [ratings, setRatings] = useState({})

  //  FETCH RATINGS
  useEffect(() => {
    if (history.length > 0) {
      fetchRatings()
    }
  }, [history])

  const fetchRatings = async () => {
    try {
      const ratingData = {}

      await Promise.all(
        history.map(async (movie) => {
          const res = await getRatingsAPI(movie._id)

          ratingData[movie._id] = {
            avg: res.data.averageRating || 0,
            total: res.data.totalRatings || 0
          }
        })
      )

      setRatings(ratingData)
    } catch (err) {
      console.log(err)
    }
  }

  // play videos
  const playVideo = (movie) => {
    if (!movie?.videoUrl) return

    let embedUrl = movie.videoUrl

    if (embedUrl.includes("watch?v=")) {
      embedUrl = embedUrl.replace("watch?v=", "embed/")
    } else if (embedUrl.includes("youtu.be/")) {
      embedUrl = embedUrl.replace("youtu.be/", "youtube.com/embed/")
    }

    setVideo(embedUrl)
  }

  //  DELETE
  const handleDelete = (id, e) => {
    e.stopPropagation()

    if (window.confirm("Remove from watch history?")) {
      dispatch(RemoveFromHistory(id))
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* EMPTY */}
      {history.length === 0 && (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400 text-xl">
            No Watch History Yet.
          </p>
        </div>
      )}

      {/*  VIDEO MODAL */}
      {video && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="relative w-full max-w-3xl">

            <button
              onClick={() => setVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-red-500"
            >
              <TiDeleteOutline size={30} />
            </button>

            <iframe
              className="w-full h-64 sm:h-80 md:h-96 rounded-lg"
              src={video}
              allowFullScreen
              title="Movie Video"
            />
          </div>
        </div>
      )}

      {/*  GRID */}
      {history.length > 0 && (
        <div className="pt-28 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

            {history.map(movie => {
              const rating = ratings[movie._id] || {}

              return (
                <div
                  key={movie._id}
                  className="bg-gray-900 rounded-lg p-3 relative cursor-pointer hover:scale-105 transition"
                  onClick={() => playVideo(movie)}
                >

                  {/* DELETE */}
                  <button
                    onClick={(e) => handleDelete(movie._id, e)}
                    className="absolute top-2 right-2 bg-black/70 text-white hover:text-red-500 rounded-full p-1"
                  >
                    <TiDeleteOutline size={30} />
                  </button>

                  {/*  POSTER */}
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="rounded-lg h-64 w-full object-cover"
                  />

                  {/* TITLE */}
                  <h3 className="mt-2 font-semibold truncate">
                    {movie.title}
                  </h3>


                  <p className="text-amber-400 text-xl font-semibold flex items-center gap-2">
                    <LiaStarSolid className="text-2xl" />
                    {rating.avg || 0} / 5
                  </p>



                  {/*  Time*/}
                  <p className="text-gray-400 text-xs mt-1">
                    {movie.watchedAt
                      ? new Date(movie.watchedAt).toLocaleString()
                      : ""}
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

export default WatchHistory