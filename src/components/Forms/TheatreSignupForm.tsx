import { useState } from 'react'
import loginImage from '../../assets/loginImage2.jpg';
import { useFormik } from 'formik';
import { ValidationSchema } from '../../schemas/ValidationSchema';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { userSignup } from '../../redux/actions/userActions';
import { AppDispatch } from '../../redux/store';
import Otp from '../OTP/Otp';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';


interface CustomJwtPayload {
  name: string;
  email: string;
}

interface UserValues {
  username: string;
  email: string;
  role?: string;
}
interface TempData {
  username: string;
  email: string;
  password: string;
  otp?: string;
  role?: string;
}


const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: ""
}
const temporaryData = {
  username: "",
  email: "",
  password: "",
  role: "theatre"
}

function TheatreSignupForm() {
  const [isOTP, setIsOTP] = useState<boolean>(false)
  const [tempData, setTempData] = useState<TempData>(temporaryData)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  console.log(tempData);


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...restValues } = values
      const dataToSend = {
        ...restValues,
        role: "theatre"
      }
      const response = await dispatch(userSignup(restValues))
      console.log(response, 'response ----')
      if (response) {
        setIsOTP(!isOTP);
        action.resetForm();
        setTempData(dataToSend);
      }
    }
  })



  const googleSignIn = async (response: string | any, status: boolean) => {
    if (status) {
      try {
        const credentials: CustomJwtPayload = jwtDecode(response.credential);
        console.log(credentials, "value")
        const userValues: UserValues = {
          username: credentials.name,
          email: credentials.email,
          role: tempData.role,
        }

        await dispatch(userSignup(userValues));
        navigate('/')
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  }
  return (
    <>

      <section className='bg-gray-950 w-full h-screen flex justify-center items-center' style={{ backgroundImage: `url(${loginImage})`, backgroundSize: 'cover' }}>
        <div>
          <h1 className='font-bebas-neue text-5xl font-medium text-primary fixed top-5 left-6'>SHOWBUZZ</h1>
        </div>
        <div className='bg-black bg-opacity-50 border-white border-solid outline-8 p-16 rounded-xl shadow-md md:w-2/3 lg:w-1/3'>
          {isOTP ? (
            <Otp userData={tempData} />
          ) : (
            <>
              <h1 className='text-2xl font-bold text-white text-center mb-4 font-roboto'>Signup As Theatre</h1>
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
                  <div className='flex items-center'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Enter your password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='ml-2 text-white focus:outline-none'
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && touched.password ? (
                    <p className='text-red-700'>{errors.password}</p>
                  ) : null}
                </div>

                <div className='mb-4'>
                  <label htmlFor='confirmPassword' className='block text-sm font-medium text-white'>
                    Confirm Password
                  </label>
                  <div className='flex items-center'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      name='confirmPassword'
                      className='mt-1 p-2 w-full border rounded-md'
                      placeholder='Confirm your password'
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='ml-2 text-white focus:outline-none'
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className='text-red-700'>{errors.confirmPassword}</p>
                  ) : null}
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
  )
}

export default TheatreSignupForm