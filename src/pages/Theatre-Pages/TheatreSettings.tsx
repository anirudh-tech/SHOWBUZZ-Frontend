import { useEffect, useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import { BiExit } from 'react-icons/bi';
import { MdAirlineSeatReclineNormal } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import RightDrawer from '../../components/Drawer/RightDrawer';
import { addScreen, listTheatre } from '../../redux/actions/adminActions';
import { IAdminSelector, IUserSelector } from '../../interface/IUserSlice';
import { IScreen } from '../../interface/ITheatreMovie';
import Modal from '../../components/Modal/Modal';

function TheatreSettings() {
    const [screen, setScreen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [screenNames, setScreenNames] = useState<any>([]);
    const [input, setInput] = useState<boolean>(false);
    const [screenInput, setScreenInput] = useState('');
    const [moneyInput, setMoneyInput] = useState<number | string>();
    const [screenInputError, setScreenInputError] = useState('');
    const [moneyInputError, setMoneyInputError] = useState('');
    const screens: IScreen[] = useSelector((state: IAdminSelector) => state.admin.theatreDetails?.screens);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const id = useSelector((state: IUserSelector) => state.user?.user?._id);

    useEffect(() => {
        console.log(screens, 'screens==========>')
        setScreenNames(screens)
        console.log(screenNames, 'screenNames====>')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screens])

    // useEffect(() => {
    //     const fetchingData = async () => {
    //         const { data } : any = await fetchData(`/theatre/theatreDetails/${id}`);
    //     }
    //     fetchingData()
    //     setScreenNames(screens.screenName)
    //     console.log(screenNames, screens, '-screenNames')
    // }, [screens])

    // useEffect(() => {
    //     const fetchingData = async () => {
    //         const { data } = await fetchData(`/theatre/theatreDetails/${id}`);
    //         if(data) {
    //             setScreenNames(data[0]?.screens)
    //         }
    //     }
    //     fetchingData()
    // }, [inputValue])

    const handleLogout = async () => {
        const response = await dispatch(logout());
        if (response) {
            navigate("/login");
        }
    };
    const handleScreenClick = () => {
        setScreen(!screen)
    };

    const handleClose = () => {
        setScreen(false);
    };

    const handleAddScreen = async () => {
        if (screenInput.trim() === '') {
            setScreenInputError('Screen name cannot be empty');
        } else if (moneyInput === 0 ) {
            setMoneyInputError("Price can't be zero");
        } else {
            console.log(screenInput, '--input value');
            const inputValue = {
                screenInput,
                moneyInput
            }
            await dispatch(addScreen( inputValue ))
            await dispatch(listTheatre(id))
        }
        setTimeout(() => {
            setScreenInput('')
            setMoneyInput('')
            setScreenInputError('');
            setMoneyInputError('');
        }, 2000)
    };

    const handleSelectScreen = (screenName: string, id: string) => {
        navigate(`/theatre/seatLayout/${screenName}/${id}`)

    }

    const handleSeatSelect = () => {
        setIsOpen(true)
    }

    const handleModalClose = () => {
        setIsOpen(false);
    };


    return (
        <div className=''>
            {
                isOpen && (
                    <>
                        <Modal handleClose={handleModalClose} open={isOpen} >
                            <h1 className='font-roboto font-semibold text-white text-3xl text-center pt-5'>Choose Screen</h1>
                            <div className='flex flex-col gap-3 justify-center items-center my-5'>
                                {
                                    screenNames?.map((screen: IScreen, index: number) => (
                                        <h1 onClick={() => handleSelectScreen(screen.screenName, screen._id)} key={index} className="text-white text-center cursor-pointer bg-slate-500 rounded-md w-1/2 py-3">{screen.screenName}</h1>
                                    ))
                                }
                            </div>
                        </Modal>
                    </>
                )
            }
            {
                screen && (
                    <>
                        <RightDrawer open={screen} handleClose={handleClose} >
                            <div className='bg-gray-900 p-3 h-screen flex justify-center'>
                                <div className=''>
                                    {
                                        !screenNames ? (
                                            <h1 className='font-roboto font-semibold text-white text-3xl text-center pt-5'>No Screens found</h1>
                                        ) : (
                                            <div className='flex flex-col items-center justify-center '>
                                                <div>
                                                <h1 className=' font-semibold text-white text-3xl text-center pt-5'>ADDED SCREENS</h1>
                                                </div>
                                                <div className='flex flex-col gap-6 mt-5 justify-center items-center '>
                                                    {screenNames.map((screen: IScreen, index: number) => (
                                                        <div className='rounded-md flex flex-col  px-4 items-center bg-slate-500' key={index}>
                                                        <span className="text-white font-bold">{screen.screenName}</span>
                                                        <span className="text-white font-bold">₹{screen.seatCost}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className='mt-4 text-center'>
                                        <button onClick={() => setInput(!input)} className='bg-red-500 text-sm text-white px-3 py-2 rounded-md'>Add Screen</button>
                                    </div>
                                </div>
                                <div className=' flex mt-20'>
                                    {
                                        input ? (
                                            <div className='text-center flex flex-col gap-2 items-center'>
                                                <input className='p-3 bg-slate-700 text-white' name='screen' onChange={(e) => setScreenInput(e.target.value)} value={screenInput} placeholder='Enter the name of the screen' type="text" />
                                                <input className='p-3  bg-slate-700 text-white' name='money' onChange={(e) => setMoneyInput(Number(e.target.value))} value={moneyInput} placeholder='Enter the cost of seat' type="number" />
                                                <button className='bg-white px-3 py-2 text-sm ms-2 rounded-md' onClick={handleAddScreen}>Add</button>
                                            </div>
                                        ) : ''
                                    }
                                    {screenInputError && <p className="text-red-500 text-sm mt-2">{screenInputError}</p>}
                                    {moneyInputError && <p className="text-red-500 text-sm mt-2">{moneyInputError}</p>}
                                </div>
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
                <div onClick={() => handleSeatSelect()} className='h-16 p-4 w-1/2 cursor-pointer  bg-gray-800 flex text-lg gap-3'>
                    <MdAirlineSeatReclineNormal className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Choose Seat Layout</h1>
                </div>
                <div onClick={() => handleScreenClick()} className='h-16 p-4 w-1/2  cursor-pointer bg-gray-800 flex text-lg gap-3'>
                    <MdAirlineSeatReclineNormal className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Choose the screens</h1>
                </div>
                <div onClick={handleLogout}  className='h-16 p-4 w-1/2 cursor-pointer  bg-gray-800 flex text-lg gap-3'>
                    <BiExit className='text-white mt-1.5' />
                    <button className='font-roboto text-white '>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default TheatreSettings