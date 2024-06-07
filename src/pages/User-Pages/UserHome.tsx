import { getAllOttMovies } from '../../redux/actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../redux/store';
import OttMovieCard from '../../components/MovieCard/OttMovieCard';
import BeatLoader from 'react-spinners/BeatLoader';
import { Pagination, Stack } from '@mui/material';
import OttBanner from '../../components/Banner/OttBanner';

function UserHome() {
  const [activePage, setActivePage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<any>()
  const { ottMovies } = useSelector((state: any) => state.admin);
  const dispatch = useDispatch<AppDispatch>()
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
  }, [activePage])
  return (
    <>
      <div className='w-full'>

        {
          ottMovies?.length ? (
            <>
              <OttBanner setSelectedMovie={setSelectedMovie} selectedMovie={selectedMovie} movies={ottMovies} />
              <OttMovieCard setSelectedMovie={setSelectedMovie} movies={ottMovies} />
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
        <Stack alignItems={'center'} spacing={2}>
          <Pagination onChange={(_, page) => setActivePage(page)} count={totalPage} variant="outlined" color="primary" />
        </Stack>
      </div>
    </>
  )
}

export default UserHome