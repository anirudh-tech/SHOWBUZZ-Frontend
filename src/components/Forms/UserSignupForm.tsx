import React from 'react';
import loginImage from '../../assets/loginImage2.jpg';
import { useFormik } from 'formik';
import { ValidationSchema } from '../../schemas/ValidationSchema';

const initialValues = {
  username:"",
  email:"",
  password:"",
  confirmPassword:""
}
function UserSignupForm() {
  const {values, errors,touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues,
    validationSchema:ValidationSchema,
    onSubmit:(values,action)=>{
      console.log(values)
      action.resetForm();
    }
  })
  console.log(errors)
  return (
    <>
      <section className='bg-gray-950 w-full h-screen flex justify-center items-center' style={{ backgroundImage: `url(${loginImage})`, backgroundSize: 'cover' }}>
        <div>
          <h1 className='font-bebas-neue text-5xl font-medium text-primary fixed top-5 left-6'>SHOWBUZZ</h1>
        </div>
        <div className='bg-black bg-opacity-50 border-white border-solid outline-8 p-16 rounded-xl shadow-md md:w-2/3 lg:w-1/3'>
          <h1 className='text-3xl font-bold text-white mb-4 font-roboto'>Signup For Your Account</h1>
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
              {errors.username && touched.username ? (<p className='text-red-700'>{errors.username}</p>): null}
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
              {errors.email && touched.email ? (<p className='text-red-700'>{errors.email}</p>): null}
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
              {errors.password && touched.password ? (<p className='text-red-700'>{errors.password}</p>): null}
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
              {errors.confirmPassword && touched.confirmPassword ? (<p className='text-red-700'>{errors.confirmPassword}</p>): null}
            </div>
            <button
              type='submit'
              className='bg-green-400 w-full text-white px-8 py-2 rounded-md hover:bg-green-600 focus:outline-none'
            >
              Signup
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default UserSignupForm;
