import React from 'react'
import Sales from '../../assets/Frame 26.svg'
import Graph from '../../assets/Frame 427319583.png'
import Candle from '../../assets/candle.svg'

function TheatreHome() {
  return (
    <>
    <div className="">
        <div className='flex justify-center pt-20'>
        <img className='w-2/3' src={Sales} alt="" />
        </div>
        <div className='flex justify-evenly pt-4' >
        <img className='' src={Graph} alt="" />
        <img src={Candle} alt="" />
        </div>
    </div>
    </>
  )
}

export default TheatreHome