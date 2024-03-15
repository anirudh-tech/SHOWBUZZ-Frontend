import React from 'react';
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
  return (
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
      {movies.map((movie) => (
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
              }} className='bg-red-600 hover:bg-red-900 rounded-md px-6 text-white p-3'>Book now</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TheatreBanner;
