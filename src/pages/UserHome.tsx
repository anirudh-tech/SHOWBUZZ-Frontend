import React from 'react'
import StreamImage from '../assets/Rectangle 201.svg'
import { AiOutlineHeart } from "react-icons/ai"
import StreamBanner from '../components/StreamBanner/StreamBanner'
import MovieCard from '../components/MovieCard/MovieCard'

function UserHome() {
  return (
    <>
      <div className='bg-black h-full'>
        <StreamBanner />
        <h1 className='text-white m-12 text-4xl font-roboto'>Trending Now</h1>
        <div className='w-full my-16 flex justify-evenly flex-wrap'>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
      </div>
    </>
  )
}

export default UserHome