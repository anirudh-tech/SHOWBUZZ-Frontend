import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

interface  Props {
    element: ReactNode
}

function UserProtectedRoute({element}:Props) {
    const {user} = useSelector((state: any) => state.user);
  return (
    <>
    {user?.role === 'user' ? <>{element}</> : <Navigate  to="/login" />}
    </>
  )
}

export default UserProtectedRoute