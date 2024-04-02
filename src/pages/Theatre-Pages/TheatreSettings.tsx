import React, { useEffect, useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import { BiExit } from 'react-icons/bi';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
// import Modal from '../../components/Modal/Modal';
// import useFetchData from '../../hooks/FetchData';
// import { IUserSelector } from '../../interface/IUserSlice';
// import postData from '../../utils/postData';
import fetchData from '../../utils/fetchData';
import RightDrawer from '../../components/Drawer/RightDrawer';
import { addScreen } from '../../redux/actions/adminActions';
import { IAdminSelector, IUserSelector } from '../../interface/IUserSlice';
import {  IScreen } from '../../interface/ITheatreMovie';

function TheatreSettings() {
    const [screen, setScreen] = useState<boolean>(false)
    const [screenNames, setScreenNames] = useState([] as IScreen[])
    const [input, setInput] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState('')
    const [inputError, setInputError] = useState('');
    const screens: IScreen[] | null = useSelector((state: IAdminSelector) => state.admin.theatreDetails?.screens);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const id = useSelector((state: IUserSelector) => state.user?.user?._id);

    useEffect(() => {
        const fetchingData = async () => {
            const { data } : any = await fetchData(`/theatre/theatreDetails/${id}`);
            console.log(data[0].screens, 'dattttaaaaaa')
        }
        fetchingData()
        setScreenNames(screens)
        console.log(screenNames, screens, '-screenNames')
    }, [screens])

    useEffect(() => {
        const fetchingData = async () => {
            const { data } = await fetchData(`/theatre/theatreDetails/${id}`);
            console.log(data[0].screens, 'dattttaaaaaa')
            setScreenNames(data[0].screens)
        }
        fetchingData()
        console.log(screenNames, screens, '-screenNames')
    }, [inputValue])

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };
    const handleScreenClick = () => {
        setScreen(!screen)
    };

    const handleClose = () => {
        setScreen(false);
    };

    const handleAddScreen = async () => {
        if (inputValue.trim() === '') {
            setInputError('Screen name cannot be empty');
        } else {
            console.log(inputValue, '--input value');
            await dispatch(addScreen({ inputValue }))
        }
        setTimeout(() => {
            setInputValue('');
            setInputError('');
        }, 2000)
    };


    return (
        <div className=''>
            {
                screen && (
                    <>
                        <RightDrawer open={screen} handleClose={handleClose} >
                            <div className='bg-black h-screen'>
                                {
                                    !screenNames ? (
                                        <h1 className='font-roboto font-semibold text-white text-3xl text-center pt-5'>No Screens found</h1>
                                    ) : (
                                        <>
                                            <h1 className='font-roboto font-semibold text-white text-3xl text-center pt-5'>ADDED SCREENS</h1>
                                            <div className='flex flex-col gap-6 mt-5 justify-center items-center '>
                                                {screenNames.map((screen, index) => (
                                                    <h1 key={index} className="text-white text-center bg-slate-500 rounded-md w-1/2 py-3">{screen.screenName}</h1>
                                                ))}
                                            </div>
                                        </>
                                    )
                                }
                                <div className='mt-4 text-center'>
                                    <button onClick={() => setInput(!input)} className='bg-red-500 text-sm text-white px-3 py-2 rounded-md'>Add Screen</button>
                                </div>
                                {
                                    input ? (
                                        <div className='text-center'>
                                            <input className='p-3 mt-4 bg-slate-700 text-white' name='screen' onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder='Enter the name of the screen' type="text" />
                                            <button className='bg-white px-3 py-2 text-sm ms-2 rounded-md' onClick={handleAddScreen}>Add</button>
                                        </div>
                                    ) : ''
                                }
                                {inputError && <p className="text-red-500 text-sm mt-2">{inputError}</p>}
                            </div>
                        </RightDrawer>
                        {/* <Modal handleClose={handleClose} open={screen}>
                            
                        </Modal> */}
                    </>
                )
            }
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
                <div onClick={() => handleScreenClick()} className='h-16 p-4 w-1/2  cursor-pointer bg-gray-800 flex text-lg gap-3'>
                    <MdAirlineSeatReclineNormal className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Choose the screens</h1>
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