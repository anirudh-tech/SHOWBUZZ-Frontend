import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { IUserSelector } from '../interface/IUserSlice';

function NotFound() {
  const role = useSelector((state: IUserSelector) => state.user?.user?.role);

  return (
    <div className='flex items-center justify-center h-screen text-white bg-gray-900'>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
        <p className="mt-4 text-white">Let's get you back
          {role === 'user' ? <Link to="/userHome" className="text-blue-500">home</Link> : <Link to="/theatre/dashboard" className="text-blue-500"> home</Link>}
          .</p>
      </div>
    </div>
  )
}

export default NotFound