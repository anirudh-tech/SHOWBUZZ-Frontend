import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import {AiOutlineMenu} from 'react-icons/ai';

function Navbar() {
    return (
        <>
            <div className='bg-transparent fixed z-10 w-full flex justify-between'>
                <h1 className='font-bebas-neue p-3 text-4xl font-medium text-primary'>SHOWBUZZ</h1>
                <SearchBar/>
                <div className='flex justify-between items-center gap-x-5 me-4'>
                    <h1 className='text-white p-2'>Profile</h1>
                    <button className='rounded-full bg-red-600 p-2'>
                        <AiOutlineMenu className='' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar