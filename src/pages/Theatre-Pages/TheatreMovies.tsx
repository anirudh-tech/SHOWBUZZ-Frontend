import React from 'react'
import { IUserSelector } from '../../interface/IUserSlice';
import { useSelector } from 'react-redux';
import useFetchData from '../../hooks/FetchData';
import { useNavigate } from 'react-router-dom';

const TheatreMovies = () => {
  const navigate = useNavigate()
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  console.log(id, '---id')

  const { data: theatre } = useFetchData(`/theatre/theatreDetails/${id}`);
  console.log(theatre[0]?.email, '---theatre')
  return (
    <>
      <div className='text-end pe-4'>
        <button onClick={()=> {
          navigate('/theatre/selectMovies')
        }} className='bg-red-500 py-2 px-4 rounded-md text-white'>Add Movie</button>
      </div>
      {theatre[0]?.selectedMovies.length === 0 ? (
        <>
          <h1 className='text-3xl text-white font-roboto font-semibold text-center'>Sorry No Movies were Added</h1>
        </>
      ) : (
        <h1 className='text-white font-roboto font-bold text-3xl px-10 pt-10 pb-4 border-b border-gray-700'>Running Shows</h1>
      )}

    </>
  )
}

export default TheatreMovies