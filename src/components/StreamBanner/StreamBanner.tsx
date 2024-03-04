import React from 'react'
import StreamImage from '../../assets/Rectangle 201.svg'
import {AiOutlineHeart} from  "react-icons/ai"

function StreamBanner() {
  return (
    <div className='relative'>
    <img className='w-full' src={StreamImage} alt="" />
    <div className='absolute top-1/4 left-36 w-fit'>
    <h1 className=' text-white text-4xl font-bold'>INSIDER</h1>
    <h1 className='text-sm my-7 text-white '>2022 | Comedy horror | 2.3hrs</h1>
    <button className='bg-violet-600 hover:bg-violet-900 rounded-md px-6 text-white p-3' >Watch now</button>
    <button className='mx-6 p-4 rounded-md bg-gradient-to-r from-white to-black '>
      <AiOutlineHeart className='w-8 h-4'/>
    </button>
    </div>
    </div>
  )
}

export default StreamBanner