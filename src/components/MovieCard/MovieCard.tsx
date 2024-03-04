import React from 'react'
import CardImage from '../../assets/Rectangle 213.png'
import { AiOutlineHeart } from 'react-icons/ai'

interface  Props {
    image: string,
    title: string,
    genre: string
}
function MovieCard() {
  return (
    <div className=" relative rounded-lg my-6 shadow-md overflow-hidden ">
      <img src={CardImage} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 rounded-b-lg w-full bg-white opacity-90 h-20">

      </div>
      <div className='absolute bottom-4 left-6'>
        <h3 className="text-lg font-bold text-gray-900">Tokyo train</h3>
        <p className="text-black text-sm">2021 | Action</p>
      </div>
      <button className='m-2 p-4 absolute top-0 rounded-md bg-white opacity-70 right-0 '>
      <AiOutlineHeart className='w-8 h-4'/>
    </button>
    </div>
  )
}

export default MovieCard