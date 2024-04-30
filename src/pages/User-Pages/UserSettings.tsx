import React, { useState } from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, updateUser } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import { CgProfile } from 'react-icons/cg';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BiExit } from 'react-icons/bi';
import Modal from '../../components/Modal/Modal';
import { IUserSelector } from '../../interface/IUserSlice';
import { useFormik } from 'formik';
import { UpdateUserValidation } from '../../schemas/EditProfileUserValidation';



function UserSettings() {
    const [profileModal, setProfileModal] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: IUserSelector) => state.user);
    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/login");
    };

    const initialValues = {
        id: "",
        username: user?.username,
    }

    const handleProfileClick = () => {
        setProfileModal(true)
    }
    const handleClose = () => {
        setProfileModal(false)
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: UpdateUserValidation,
        onSubmit: async (values, action: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            values.id = user._id
            const response = await dispatch(updateUser(values))
            console.log(response, 'response ----')
            if (response) {
                action.resetForm();
                setProfileModal(false)
            }
        }
    })



    return (
        <div>
            {
                profileModal &&
                <Modal open={profileModal} handleClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor='username' className='block text-sm font-medium text-white'>
                                Username
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                className='mt-1 p-2 w-full border rounded-md'
                                placeholder='Enter your username'
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.username && touched.username ? (<p className='text-red-700'>{errors.username}</p>) : null}
                        </div>
                        <button
                            type='submit'
                            className='bg-red-600 w-full text-white px-8 py-2 rounded-md hover:bg-green-600 focus:outline-none'
                        >
                            Submit
                        </button>
                    </form>
                </Modal>
            }
            <div className=''>
                <div className='p-4 flex text-3xl gap-3'>
                    <AiFillSetting className='text-white' />
                    <h1 className='font-roboto font-bold text-white '>SETTINGS</h1>
                </div>
            </div>
            <div className='flex flex-col p-16 gap-y-8 items-center justify-items'>
                <div onClick={() => handleProfileClick()} className='h-16 p-4 w-1/2 rounded-2xl bg-gray-800 flex text-lg gap-3 cursor-pointer'>
                    <CgProfile className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Edit Profile</h1>
                </div>
                <div className='h-16 p-4 w-1/2 rounded-2xl  bg-gray-800 flex text-lg gap-3'>
                    <RiLockPasswordLine className='text-white mt-1' />
                    <h1 className='font-roboto text-white '>Change Password</h1>
                </div>
                <div className='h-16 p-4 w-1/2 rounded-2xl  bg-gray-800 flex text-lg gap-3'>
                    <BiExit className='text-white mt-1.5' />
                    <button onClick={handleLogout} className='font-roboto text-white '>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default UserSettings