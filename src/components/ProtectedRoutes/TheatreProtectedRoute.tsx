import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

interface  Props {
    element: ReactNode
}

function TheatreProtectedRoute({element}:Props) {
    const {user} = useSelector((state: any) => state.user);
    console.log(user,'inside protected Route')
  return (
    <>
    {user?.role === 'theatre' ? <>{element}</> : <Navigate  to="/" />}
    </>
  )
}

export default TheatreProtectedRoute