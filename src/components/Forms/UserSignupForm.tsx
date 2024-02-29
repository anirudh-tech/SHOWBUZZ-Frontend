import React, { KeyboardEvent, useState } from 'react';
import loginImage from '../../assets/loginImage2.jpg';
import { useFormik } from 'formik';
import { ValidationSchema } from '../../schemas/ValidationSchema';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { userSignup } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import Otp from '../OTP/Otp';


interface CustomJwtPayload {
  name: string;
  email: string;
  picture?: string;
}

interface UserValues {
  username: string;
  email: string;
  profilePic?: string;
}


const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
}
function UserSignupForm() {
  const [isOTP, setIsOTP] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values, action) => {
      const {confirmPassword,...restValues} = values
      await dispatch(userSignup(restValues))
      setIsOTP(!isOTP);
      action.resetForm();
    }
  })

  

  const googleSignIn = async (response: string | any, status: boolean) => {
    if (status) {
      try {
        let credentials: CustomJwtPayload = jwtDecode(response.credential);
        console.log(credentials, "value")
        let userValues: UserValues = {
          username: credentials.name,
          email: credentials.email,
        }

        dispatch(userSignup(userValues));

      } catch (error) {

      }
    }
  }
  console.log(errors)
  return (
    <>

      <section className='bg-gray-950 w-full h-screen flex justify-center items-center' style={{ backgroundImage: `url(${loginImage})`, backgroundSize: 'cover' }}>
        <div>
          <h1 className='font-bebas-neue text-5xl font-medium text-primary fixed top-5 left-6'>SHOWBUZZ</h1>
        </div>
        <div className='bg-black bg-opacity-50 border-white border-solid outline-8 p-16 rounded-xl shadow-md md:w-2/3 lg:w-1/3'>
          {isOTP ? (
            <Otp />
          ) : (
            <>
              <h1 className='text-2xl font-bold text-white mb-4 font-roboto'>Signup For Your Account</h1>
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
                <div className='mb-4'>
                  <label htmlFor='email' className='block text-sm font-medium text-white'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Enter your email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (<p className='text-red-700'>{errors.email}</p>) : null}
                </div>
                <div className='mb-4'>
                  <label htmlFor='password' className='block text-sm font-medium text-white'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Enter your password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (<p className='text-red-700'>{errors.password}</p>) : null}
                </div>
                <div className='mb-4'>
                  <label htmlFor='confirmPassword' className='block text-sm font-medium text-white'>
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    className='mt-1 p-2 w-full border rounded-md'
                    placeholder='Confirm your password'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (<p className='text-red-700'>{errors.confirmPassword}</p>) : null}
                </div>
                <button
                  type='submit'
                  className='bg-green-400 w-full text-white px-8 py-2 rounded-md hover:bg-green-600 focus:outline-none'
                >
                  Signup
                </button>
              </form>
              <div className='flex justify-center mt-3'>
                <GoogleLogin
                  text='signup_with'
                  shape='circle'
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    googleSignIn(credentialResponse, true);
                  }}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                />
              </div>
              <p className='text-white text-center mt-3'>Already have an account?
                <Link className='mx-2 font-bold text-blue-900 hover:underline hover:text-red-700' to="/login">
                  Go to Login
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default UserSignupForm;
