import useFetchData from '../../hooks/FetchData';
// import { useNavigate } from 'react-router-dom';
import TheatreBanner from '../../components/TheatreBanner/TheatreBanner';
import TheatreMovieCard from '../../components/MovieCard/TheatreMovieCard';

const UserTheatreMovies = () => {
  const { data: movies } = useFetchData('/movie/listTheatreMovies');
  return (
    <div className='w-full'>
      {
        movies.length ? (
          <>
          <TheatreBanner movies ={movies}/>
          <TheatreMovieCard movies ={movies} />
          </>
        ) : (
          <div className='flex items-center justify-center h-screen text-white bg-gray-900'>
            <div className="text-center">
              <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
              <p className="mb-4 text-lg">Oops! No Movies Found.</p>
              <div className="animate-bounce">
                <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default UserTheatreMovies