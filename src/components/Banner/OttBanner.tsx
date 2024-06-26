import { useEffect, useState } from 'react';
import { IMovie } from '../../interface/ITheatreMovie';
import { Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import MuxPlayer from '@mux/mux-player-react';
import { getMovieData } from '../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

interface Props {
  movies: IMovie[];
  selectedMovie: any;
  setSelectedMovie: any;
}
const OttBanner = ({ movies, selectedMovie, setSelectedMovie }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [moviesLength, setMoviesLength] = useState(0)
  useEffect(() => {
    const moviesLengthArray = movies
      .filter(movie => movie.status !== "blocked")
    console.log("🚀 ~ file: TheatreBanner.tsx:22 ~ useEffect ~ moviesLengthArray:", moviesLengthArray)
    setMoviesLength(moviesLengthArray.length)
  }, [movies])

  const handleClick = async(id: string) => {
    const response = await dispatch(getMovieData(id))
    setSelectedMovie(response.payload)
  }
  return (
    <>
      {
        selectedMovie ? (
          <div className=''>
            <MuxPlayer
              playbackId={selectedMovie.video}
              streamType="on-demand"
              autoPlay
              style={{ width: '100%', height: '500px' }}
            />
          </div>
        ) : (
          <>
            {
              moviesLength === 0 ? (
                <div className='absolute inset-0 flex justify-center items-center bg-black/60 w-full h-full'>
                  <h1 className='text-3xl text-white text-center'>Sorry...No Movies Found</h1>
                </div>
              ) : (
                <>
                  <Swiper
                    modules={[Navigation, Scrollbar, Autoplay]}
                    slidesPerView={1}
                    loop
                    navigation
                    autoplay={{ delay: 4000 }}
                    scrollbar={{ draggable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    {movies
                      .filter(movie => movie.status !== "blocked")
                      .map((movie) => (
                        <SwiperSlide key={movie._id}>
                          <div className='w-full'>
                            <img className='w-full h-[550px] object-cover' src={movie.banner} alt={movie.title} />
                            <div className='absolute bg-gradient-to-t from-[rgba(0,0,0,0.6)]  w-full h-1/2  bottom-0'></div>
                            <div className='absolute top-[40%] left-36 w-fit'>
                              <h1 className='text-white  text-4xl font-semibold'>{movie.title}</h1>
                              <h1 className='text-lg pt-6 py-2 font-semibold text-white'>DIRECTED BY :<span className='px-3  font-normal'>{movie.director}</span></h1>
                              <h1 className='text-lg font-semibold py-2 text-white'>GENRE :<span className='px-3 font-normal'>{movie.genre}</span></h1>
                              <h1 className='text-lg font-semibold py-2 text-white'>CAST :<span className='px-3  font-normal'>{movie.cast}</span></h1>
                              <button onClick={() => {
                                handleClick(movie._id)
                              }} className='bg-red-500 rounded-md px-6 text-white p-3'>Watch Now</button>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </>
              )
            }
          </>
        )
      }


    </>
  )
}

export default OttBanner