import React, { useEffect, useState } from 'react';
import { IMovie } from '../../interface/ITheatreMovie';
// import AwesomeSlider from 'react-awesome-slider';
// import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import { Scrollbar, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

interface Props {
  movies: IMovie[];
}

const TheatreBanner = ({ movies }: Props) => {
  const navigate = useNavigate()
  const [moviesLength, setMoviesLength] = useState(0)
  useEffect(() => {
    const moviesLengthArray = movies
      .filter(movie => movie.status !== "blocked")
    console.log("🚀 ~ file: TheatreBanner.tsx:22 ~ useEffect ~ moviesLengthArray:", moviesLengthArray)
    setMoviesLength(moviesLengthArray.length)
  }, [movies])
  return (
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
                      <div className='absolute inset-0 bg-black/20 w-full h-full'></div>
                      <div className='absolute top-1/4 left-36 w-fit'>
                        <h1 className='text-white font-roboto text-4xl font-bold'>{movie.title}</h1>
                        <h1 className='text-lg pt-6 py-2 font-bold text-white'>DIRECTED BY :<span className='px-3 font-roboto font-normal'>{movie.director}</span></h1>
                        <h1 className='text-lg font-bold py-2 text-white'>GENRE :<span className='px-3 font-roboto font-normal'>{movie.genre}</span></h1>
                        <h1 className='text-lg font-bold py-2 text-white'>CAST :<span className='px-3 font-roboto font-normal'>{movie.cast}</span></h1>
                        <button onClick={() => {
                          navigate(`/selectTheatre/${movie._id}`);
                        }} className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-6 text-white p-3'>Book now</button>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </>
        )
      }

    </>
  );
};

export default TheatreBanner;
