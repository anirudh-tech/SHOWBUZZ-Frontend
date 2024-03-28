import { IUserSelector } from '../../interface/IUserSlice';
import { useSelector } from 'react-redux';
import useFetchData from '../../hooks/FetchData';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';


const TheatreMovies = () => {
  const navigate = useNavigate()
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);

  const { data: theatre } = useFetchData(`/theatre/theatreDetails/${id}`);
  console.log(theatre[0]?.selectedMovies, 'movie')

  console.log(theatre[0]?.email, '---theatre')
  return (
    <>
      <div className='text-end pe-4'>
        <button onClick={() => {
          navigate('/theatre/selectMovies')
        }} className='bg-red-500 py-2 px-4 rounded-md text-white'>Add Movie</button>
      </div>
      {theatre[0]?.selectedMovies?.length === 0 ? (
        <>
          <h1 className='text-3xl text-white font-roboto font-semibold text-center'>Sorry No Movies were Added</h1>
        </>
      ) : (
        <>
          <h1 className='text-white font-roboto font-bold text-3xl px-10 pt-2 pb-4 border-b border-gray-700'>Running Shows</h1>
          <div className='grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-5 px-20 mt-6'>
            {
              theatre[0]?.selectedMovies?.map((movie: any) => (
                <div key={movie.movieId._id} className='mb-6 w-full h-3/5 relative cursor-pointer'>
                  <div className='w-full h-full overflow-clip rounded-t-md'>
                    <img className='object-cover w-full h-full' src={movie.movieId?.image} alt="" />
                  </div>
                  <div className='rounded-b-md mb-3 xl:flex-col xl:justify-between xl:items-center p-1 bg-slate-800  w-full'>
                    <div className='flex justify-start ps-2  '>
                      <AiFillStar className='text-red-800 mt-1' />
                      <span className='ms-2 text-white'>{6.7}</span>
                    </div>
                    <div className='p-3'>
                      <h1 className='text-slate-400 font-roboto line-clamp-1'>TITLE: {movie.movieId.title}</h1>
                      <h1 className='text-slate-400 font-roboto line-clamp-1'>DIRECTOR: {movie.movieId.director}</h1>
                      <h1 className='text-slate-400 font-roboto line-clamp-1'>CAST: {movie.movieId.cast}</h1>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </>
      )}

    </>
  )
}

export default TheatreMovies