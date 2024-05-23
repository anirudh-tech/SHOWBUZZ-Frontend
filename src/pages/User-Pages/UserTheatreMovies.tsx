import useFetchData from '../../hooks/FetchData';
// import { useNavigate } from 'react-router-dom';
import TheatreBanner from '../../components/Banner/TheatreBanner';
import TheatreMovieCard from '../../components/MovieCard/TheatreMovieCard';
import BeatLoader from 'react-spinners/BeatLoader';

const UserTheatreMovies = () => {
  

  const { data: movies } = useFetchData('/movie/listTheatreMovies');
  return (
    <div className='w-full'>
      
      {
        movies.length ? (
          <>
          <TheatreBanner movies ={movies}/>
          <TheatreMovieCard  movies ={movies} />
          </>
        ) : (
          <div className='absolute inset-0 bg-black/60 w-full h-full flex justify-center'>
            <div className='flex flex-col justify-center'>
              <div className='flex justify-center'>
                <BeatLoader
                  color="#36d7b7"
                  loading
                  margin={0}
                  size={15}
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default UserTheatreMovies