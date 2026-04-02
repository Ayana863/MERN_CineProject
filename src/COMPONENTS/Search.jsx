import React from 'react'
// import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../Slice/SearchSlice'





function Search() {
  const searchValue = useSelector(state => state.search.value)
  const dispatch = useDispatch()
  return (
    <>


      <input
        onChange={(e) => dispatch(searchItems(e.target.value))}
        value={searchValue}
        type="text" placeholder="Search movies..."
        className='w-40 focus:w-56 px-2 py-1 text-white bg-transparentborder-b border-gray-500 focus:border-amber-400
         outline-noneplaceholder-gray-400  transition-all duration-300'
      />

    </>
  )
}

export default Search