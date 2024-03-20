import React from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import { BiExit } from 'react-icons/bi';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

function TheatreSettings() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className='h-full bg-gray-900'>
            <div className=''>
                <div className='h-16 p-4  bg-gray-800 flex text-3xl gap-3'>
                    <AiFillSetting className='text-white ' />
                    <h1 className='font-roboto text-white '>SETTINGS</h1>
                </div>
            </div>
            <div className='flex flex-col p-16 gap-y-8 items-center justify-items'>
                <div className='h-16 p-4 w-1/2  bg-gray-800 flex text-lg gap-3'>
                    <CgProfile className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Edit Profile</h1>
                </div>
                <div className='h-16 p-4 w-1/2   bg-gray-800 flex text-lg gap-3'>
                    <RiLockPasswordLine className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Change Password</h1>
                </div>
                <div className='h-16 p-4 w-1/2   bg-gray-800 flex text-lg gap-3'>
                    <MdAirlineSeatReclineNormal className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Choose Seat Layout</h1>
                </div>
                <div className='h-16 p-4 w-1/2   bg-gray-800 flex text-lg gap-3'>
                    <BiExit className='text-white mt-1.5' />
                    <button onClick={handleLogout} className='font-roboto text-white '>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default TheatreSettings