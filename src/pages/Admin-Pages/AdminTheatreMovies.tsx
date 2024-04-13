import { useNavigate } from 'react-router-dom';
import useFetchData from '../../hooks/FetchData';
import TheatreMovieCard from '../../components/MovieCard/TheatreMovieCard';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { IMovie } from '../../interface/ITheatreMovie';
import AdminEditMovies from './AdminEditMovies';

const initialValues = {
    title: '',
    director: '',
    genre: '',
    format: '',
    languagesAvailable: '',
    image: '',
    banner: '',
    cast: '',
  }
const AdminTheatreMovies = () => {
    const [open, setOpen] = useState(false)
    const [movie, setMovie] = useState<IMovie>(initialValues as IMovie)
    const { data: movies } = useFetchData('/movie/listTheatreMovies');
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <>
        {
            open && 
            <Modal open={open} handleClose={handleClose}>
                <AdminEditMovies movie={movie} />
            </Modal>
        }
            <div className='text-end me-4'>
                <button onClick={() => navigate('/admin/addMovies')} className='bg-red-600 p-3 rounded-md text-white hover:bg-red-900'>ADD MOVIES</button>
            </div>
            <TheatreMovieCard movies={movies} setOpen={setOpen} setMovie={setMovie}/>
        </>
    )
}

export default AdminTheatreMovies