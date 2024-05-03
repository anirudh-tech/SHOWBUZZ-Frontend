import { IMovie } from '../../interface/ITheatreMovie';
import { AiFillEdit, AiFillStar, AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { IUserSelector } from '../../interface/IUserSlice';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';




interface Props {
  movies: IMovie[];
  setOpen?: any;
  setMovie?: any;
  isOpen?: any;
  handleDeleteClick?: any;
  positiveClick?: any;
  negativeClick?: any;
  newStatus?: string;
}
const TheatreMovieCard = ({ movies, setOpen, newStatus, setMovie, isOpen, handleDeleteClick, positiveClick, negativeClick }: Props) => {

  const navigate = useNavigate();
  console.log(movies, 'movies from card');

  const handleClick = (movie: IMovie) => {
    setOpen(true)
    setMovie(movie)
  }
  const handleMovieClick = (id: string | undefined) => {
    if (role == 'user') {
      navigate(`/selectTheatre/${id}`);
    }
  }

  const role = useSelector((state: IUserSelector) => state.user?.user?.role);
  return (
    <>

      {
        isOpen &&
        <Modal open={isOpen}>
          <>
          <h1 className='text-xl text-white font-bebas-neue'> {newStatus === 'blocked' ? 'Are you sure you want to delete this movie?' : 'Are you sure you want to restore this movie?'}</h1>
            <div className='flex justify-center gap-10 mt-8'>
              <button onClick={() => positiveClick()} className='bg-green-500 p-4 rounded-md'>Yes</button>
              <button onClick={() => negativeClick()} className='bg-red-500 p-4 rounded-md'>No</button>
            </div>
          </>
        </Modal>
      }
      {
        role == 'admin' &&
        <div className='grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-5 px-20 mt-6'>
          {movies && movies.map((movie) => (
            <div onClick={() => handleMovieClick(movie._id)} key={movie._id} className='mb-6 w-full h-3/5 relative cursor-pointer'>
              {movie.status === "blocked" &&
                <>
                  <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-2xl">
                    <h1>Movie has been deleted</h1>
                    <h1>❗❗❗❗</h1>
                  </div>
                </>
              }
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

              {movie.status === 'active' ? (
                <>
                <button onClick={() => handleDeleteClick(movie._id, movie.status)} className='bg-gray-600 flex gap-1 absolute top-14 right-2 p-2 rounded-md text-white hover:bg-red-900'>
                  Delete <AiOutlineDelete className='mt-0.5' />
                </button>
                  <button onClick={() => handleClick(movie)} className='bg-red-600 absolute top-2 right-2 flex gap-1  p-2 rounded-md text-white hover:bg-red-900'>Edit <AiFillEdit className='mt-1' /> </button>
                </>
              ) : (
                <button onClick={() => handleDeleteClick(movie._id, movie.status)} className='bg-green-600 absolute top-2 right-2 p-2 rounded-md text-white hover:bg-green-900'>
                  Restore
                </button>
              )}            </div>
          ))}
        </div>
      }

      {
        role === 'user' &&
        <div className='grid xl:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-5 px-20 mt-6'>
          {movies && movies
            .filter(movie => movie.status !== "blocked")
            .map((movie) => (
              <div onClick={() => handleMovieClick(movie._id)} key={movie._id} className='mb-6 w-full h-3/5 relative cursor-pointer'>
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
              </div>
            ))}
        </div >
      }
    </>
  )
}

export default TheatreMovieCard