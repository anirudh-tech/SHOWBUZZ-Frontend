import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { deleteMovie, getAllOttMovies } from '../../redux/actions/adminActions'
import { Pagination, Stack } from '@mui/material'
import OttMovieCard from '../../components/MovieCard/OttMovieCard'
import { IMovie } from '../../interface/ITheatreMovie'
import Modal from '../../components/Modal/Modal'
import AdminEditMovies from './AdminEditMovies'


const initialValues = {
  title: '',
  director: '',
  genre: '',
  video: '',
  banner: '',
  cast: '',
}
const AdminOttMovies = () => {
  const [activePage, setActivePage] = useState<number>(1)
  const [open, setOpen] = useState(false)
  const [movie, setMovie] = useState<IMovie>(initialValues as IMovie)
  const [totalPage, setTotalPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('');
  const [id, setId] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { ottMovies } = useSelector((state: any) => state.admin);
  console.log("🚀 ~ file: AdminOttMovies.tsx:32 ~ AdminOttMovies ~ ottMovies:", ottMovies)

  useEffect(() => {
    dispatch(getAllOttMovies({
      page: activePage,
      limit: 10
    })).then((response) => {
      if (response.payload?.totalPage) {
        setTotalPage(response.payload?.totalPage);
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, isOpen])

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

  

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <div className='pt-20'>
        {ottMovies?.length === 0 ? (
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
                <h1 className='text-3xl font-bold text-white '>Admin Ott Movies</h1>
                <button onClick={() => navigate('/admin/add-stream-movies')} className='border-red-500 border-2 p-3 rounded-md text-white hover:bg-red-500'>ADD MOVIES</button>
              </div>
            </div>
            <OttMovieCard movies={ottMovies} newStatus={newStatus} handleDeleteClick={handleDeleteClick} positiveClick={positiveClick} negativeClick={negativeClick} isOpen={isOpen} setOpen={setOpen} setMovie={setMovie} />

            <Stack alignItems={'center'} spacing={2}>
              <Pagination onChange={(_, page) => setActivePage(page)} count={totalPage} variant="outlined" color="primary" />
            </Stack>
          </>
        )}
      </div>
    </>

  )
}

export default AdminOttMovies