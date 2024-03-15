import React, { useEffect, useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import SideBar from '../SideBar/SideBar';

function Navbar() {
    const [show, setShow] = useState(false)
    const [count, setCount] = useState(0);


    useEffect(() => {
        const intervalId = setInterval(() => {
            timer()
        }, 250);

        return () => clearInterval(intervalId);
    }, [count]);

    const timer = () => {
        setCount((prevCount) => prevCount + 1);
        return count
    }

    return (
        <>
            {
                show && <>
                    <SideBar onClick={() => setShow(!show)} />
                </>
            }
            <div className='bg-transparent sticky top-0 z-50 w-full flex justify-between'>
                <h1 className='font-bebas-neue items-center p-3 text-blue-600 text-4xl text-shadow-md'>
                    {/* <span className='text-5xl tracking-wider text-red-600'>S</span> */}
                    SHOWBU<span className={` tracking-wider transition-all duration-500 rotate-180  ${count % 2 == 0 ? 'text-green-600' : 'text-red-600  duration-700'}`}>ZZ</span>
                </h1>
                <SearchBar />
                <div className='flex justify-between items-center gap-x-5 me-4'>
                    <h1 className='text-white p-2'>Profile</h1>
                    <button onClick={() => {
                        setShow(!show)
                    }} className='rounded-full  p-2'>
                        {
                            show ? (<AiOutlineClose className='text-white' />) : (<AiOutlineMenu className='text-white' />)
                        }

                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar