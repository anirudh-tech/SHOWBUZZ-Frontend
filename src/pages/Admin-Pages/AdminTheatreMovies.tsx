import { useNavigate } from 'react-router-dom';
import useFetchData from '../../hooks/FetchData';
import TheatreMovieCard from '../../components/MovieCard/TheatreMovieCard';

const AdminTheatreMovies = () => {
    const { data: movies } = useFetchData('/movie/listTheatreMovies');
    const navigate = useNavigate()
    return (
        <>
            <div className='text-end me-4'>
                <button onClick={() => navigate('/admin/addMovies')} className='bg-red-600 p-3 rounded-md text-white hover:bg-red-900'>ADD MOVIES</button>
            </div>
            <TheatreMovieCard movies={movies}/>
        </>
    )
}

export default AdminTheatreMovies