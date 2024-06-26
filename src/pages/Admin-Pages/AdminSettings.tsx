import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import { BiExit } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

function AdminSettings() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const handleLogout = async() => {
        const response = await dispatch(logout());
        if(response) {
            navigate("/login");
        }
    };

    return (
        <div className='pt-16'>
            <div className=''>
                <div className='h-16 p-4 justify-center flex text-3xl gap-3'>
                    <h1 className=' text-white '>SETTINGS</h1>
                </div>
            </div>
            <div className='flex flex-col p-16 gap-y-8 items-center justify-items'>
                <div className='h-16 p-4 w-1/2  bg-gray-800 flex text-lg gap-3'>
                    <CgProfile className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Edit Profile</h1>
                </div>
                <div className='h-16 p-4 w-1/2   bg-gray-800 flex text-lg gap-3'>
                    <BiExit className='text-white mt-1.5' />
                    <button onClick={handleLogout} className='font-roboto text-white '>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default AdminSettings