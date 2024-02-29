import React, { useState } from 'react'
import loginImage from '../../assets/loginImage2.jpg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { userLogin } from '../../redux/actions/userActions';


interface UserValues {
  email: string;
  password:string;
}
function UserLoginForm() {
  const [formData, setFormData] = useState<UserValues>({
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value}))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await dispatch(userLogin(formData))
    if(response) {
      navigate('/home')
    }


  }
  return (
    <>
    <section className='bg-gray-950 w-full h-screen flex justify-center items-center ' style={{ backgroundImage: `url(${loginImage})`, backgroundSize: 'cover' }}>
        <div>
            <h1 className='font-bebas-neue text-5xl font-medium text-primary fixed top-5 left-6'>SHOWBUZZ</h1>
        </div>
      <div className='bg-black bg-opacity-50 border-white border-solid outline-8 p-16 rounded-xl shadow-md md:w-2/3  lg:w-1/3'>
        <h1 className='text-2xl font-bold text-white mb-4 font-roboto'>Login To Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm font-medium text-white'>
              Email
            </label>
            <input
              type='text'
              id='email'
              name='email'
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your email'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-sm font-medium text-white'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={handleChange}
              className='mt-1 p-2 w-full border rounded-md'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='bg-green-400 w-full text-white px-8 py-2 rounded-md hover:bg-green-600 focus:outline-none'
          >
            Login
          </button>
        </form>
        <p className='text-white text-center mt-3' >Don't Have an Account? 
          <Link className='mx-2 text-blue-900 font-bold hover:underline hover:text-red-700' to="/signup">
          Sign Up Here
        </Link></p>
      </div>
    </section>
    </>
  )
}

export default UserLoginForm