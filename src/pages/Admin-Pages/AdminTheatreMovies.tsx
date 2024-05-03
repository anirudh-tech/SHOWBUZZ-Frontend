import { useNavigate } from 'react-router-dom';
import TheatreMovieCard from '../../components/MovieCard/TheatreMovieCard';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { IMovie } from '../../interface/ITheatreMovie';
import AdminEditMovies from './AdminEditMovies';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteMovie, getAllMovies } from '../../redux/actions/adminActions';

const initialValues = {
    title: '',
    director: '',
    genre: '',
    format: [] as string[],
    languagesAvailable: '',
    image: '',
    banner: '',
    cast: '',
}
const AdminTheatreMovies = () => {
    const [open, setOpen] = useState(false)
    const [movie, setMovie] = useState<IMovie>(initialValues as IMovie)
    const [activePage, setActivePage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false)
    const [newStatus, setNewStatus] = useState('');
    const [id, setId] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    const { movies } = useSelector((state: any) => state.admin);


    useEffect(() => {
        dispatch(getAllMovies({
            page: activePage,
            limit: 10
        })).then((response) => {
            if (response.payload?.totalPage) {
                setTotalPage(response.payload?.totalPage);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage, isOpen,movies])
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteClick = async (id: any, currentStatus: string) => {
        console.log("🚀 ~ file: AdminTheatreMovies.tsx:52 ~ handleDeleteClick ~ currentStatus:", currentStatus)
        setIsOpen(true)
        currentStatus === 'active' ? setNewStatus('blocked') : setNewStatus('active');
        setId(id)

    }

    const positiveClick = async () => {
        dispatch(deleteMovie({ newStatus, id }))
        setIsOpen(false)
    }

    const negativeClick = async () => {
        setIsOpen(false)
    }

    return (
        <div className='pt-20'>
            {movies?.length === 0 ? (
                <div className='absolute inset-0 bg-black/60 w-full h-full flex justify-center'>

                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-col justify-center'>
                            <h1 className='text-3xl text-white'>No Movies where added</h1>
                            <div className='text-center me-4'>
                                <button onClick={() => navigate('/admin/addMovies')} className='bg-red-600 p-3 rounded-md text-white hover:bg-red-900'>ADD MOVIES</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {
                        open &&
                        <Modal open={open} handleClose={handleClose}>
                            <AdminEditMovies movie={movie} setOpen={setOpen} />
                        </Modal>
                    }
                    <div className=''>
                        <div className='p-4 flex  gap-3 justify-between'>
                            <div></div>
                            <h1 className='text-3xl font-bold text-white '>Theatre Movies</h1>
                            <button onClick={() => navigate('/admin/addMovies')} className='border-red-500 border-2 p-3 rounded-md text-white hover:bg-red-500'>ADD MOVIES</button>
                        </div>
                    </div>
                    <TheatreMovieCard movies={movies} newStatus={newStatus} handleDeleteClick={handleDeleteClick} positiveClick={positiveClick} negativeClick={negativeClick} isOpen={isOpen} setOpen={setOpen} setMovie={setMovie} />

                    <Stack alignItems={'center'} spacing={2}>
                        <Pagination onChange={(_, page) => setActivePage(page)} count={totalPage} variant="outlined" color="primary" />
                    </Stack>
                </>
            )}
        </div>
    )
}

export default AdminTheatreMovies
