import React from 'react'

const RequestPendingPage = () => {
  return (
    <div className='flex items-center justify-center h-screen text-white bg-gray-900'>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">Sorry</h1>
        <p className="mb-4 text-lg">Please wait till the admin approves your account</p>
        <div className="animate-bounce">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default RequestPendingPage