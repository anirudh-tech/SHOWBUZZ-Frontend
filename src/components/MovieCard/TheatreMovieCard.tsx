import React from 'react'
import { IMovie } from '../../interface/ITheatreMovie';
import { AiFillEdit, AiFillStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { IUserSelector } from '../../interface/IUserSlice';



interface Props {
  movies: IMovie[];
}
const TheatreMovieCard = ({movies}: Props) => {
  const role = useSelector((state: IUserSelector) => state.user?.user?.role);
  return (
    <div className='grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-5 px-20 mt-6'>
      {movies && movies?.map((movie) => (
        <div key={movie._id} className='mb-6 w-full h-3/5 relative'>
          <div className='w-full h-full overflow-clip rounded-t-md'>
            <img className='object-cover w-full h-full' src={movie?.image} alt="" />
          </div>
          <div className='rounded-b-md mb-3 xl:flex-col xl:justify-between xl:items-center p-1 bg-slate-800  w-full'>
            <div className='flex justify-start ps-2  '>
              <AiFillStar className='text-red-800 mt-1' />
              <span className='ms-2 text-white'>{6.7}</span>
            </div>
            <div className='p-3'>
              <h1 className='text-slate-400 font-roboto line-clamp-1'>TITLE: {movie.title}</h1>
              <h1 className='text-slate-400 font-roboto line-clamp-1'>DIRECTOR: {movie.director}</h1>
              <h1 className='text-slate-400 font-roboto line-clamp-1'>CAST: {movie.cast}</h1>
            </div>
          </div>
          {
            role === "admin" && <button className='bg-red-600 absolute top-2 right-2  p-2 rounded-md text-white hover:bg-red-900'> <AiFillEdit /> </button>
          }
        </div>
      ))}
    </div>
  )
}

export default TheatreMovieCard