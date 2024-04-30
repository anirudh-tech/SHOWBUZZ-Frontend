import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminOttMovies = () => {
  const navigate = useNavigate()
  return (
    <>
    <div>
      <h1 className='text-center text-white text-3xl'>AdminOttMovies</h1>
      <button onClick={()=> navigate('/admin/add-stream-movies')} className='text-white'>Add Movie</button>
    </div>

    </>

  )
}

export default AdminOttMovies