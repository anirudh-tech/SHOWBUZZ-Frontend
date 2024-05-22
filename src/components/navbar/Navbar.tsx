import { useEffect, useState } from 'react'
// import SearchBar from '../SearchBar/SearchBar'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div className='bg-[rgba(0,0,0,0.2)] backdrop-blur-lg fixed top-0 z-50 w-full flex justify-between'>
                    <h1 className='bg-gradient-to-r p-3 from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-3xl font-playfair'>
                        SHOWBUZZ
                    </h1>
                    {/* <SearchBar /> */}
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