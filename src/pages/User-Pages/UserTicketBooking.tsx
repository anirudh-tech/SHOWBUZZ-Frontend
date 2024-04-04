import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/FetchData';
import { useParams } from 'react-router-dom';
import SelectDates from '../../components/Buttons/SelectDates';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { listAllTheatre } from '../../redux/actions/adminActions';
import { IProps, IScreen, ITheatre, ITime } from '../../interface/ITheatreMovie';
import { format, formatDate, parse } from 'date-fns';
import { date } from 'yup';


const UserTicketBooking = () => {
  const currentDate = new Date();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTheatre, setSelectedTheatre] = useState<string | null>('');
  const [selectedDate, setSelectedDate] = useState<any>(new Date(currentDate.setUTCHours(0, 0, 0, 0)).toISOString())
  const [selectedTime, setSelectedTime] = useState<any>({})
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams();
  const { data: movie } = useFetchData(`/movie/findMovie/${id}`);
  const { data: theatres } = useFetchData(`/theatre/listTheatresUsingMovieId/${movie[0]?._id}/${selectedDate}`);

  console.log(theatres, '-------> theatres')

  useEffect(() => {
    dispatch(listAllTheatre())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheatre])



  const handleDateSelect = (date: any) => {
    const parsedDate = parse(date, 'dd MMM EEE', new Date());
    const formattedDate = format(parsedDate, "yyyy-MM-dd'T'00:00:00.000'Z'");
    console.log('date----->', formattedDate);
    setSelectedDate(formattedDate);
  };

  const handleTimeSelect = (screenTime: ITime) => {
    if (setSelectedTime) {
      setSelectedTime(screenTime === selectedTime ? null : screenTime);
    }
  };

  const movieId = movie[0]?._id

  const filteredScreens: IScreen[] = theatres.flatMap((theatre: ITheatre) =>
    theatre.screens.filter(screen =>
      screen.selectedMovies.some((movie: IProps) => movie?.movieId?._id === movieId)
    )
  );

  console.log(filteredScreens, 'screens filtered')

  const filteredData = filteredScreens
    .filter((screen: IScreen) =>
      screen.selectedMovies.some((movie: IProps) =>
        movie.movieId?._id === movieId &&
        movie.selectedDateTimes.some((dateTime: any) => dateTime.date === selectedDate)
      )
    )
    .map((screen: IScreen) => ({
      screenName: screen.screenName,
      selectedTimes: screen.selectedMovies
        .filter((movie: IProps) => movie.movieId?._id === movieId)
        .flatMap((movie: IProps) => movie.selectedDateTimes
          .filter((dateTime: any) => dateTime.date === selectedDate)
          .map((dateTime: any) => dateTime.selectedTime)
        )
    }));

  console.log(filteredData, '------dataaaa');

  // const selectedTimesArray: ITime[] = [];
  // filteredScreensWithSelectedDateAndMovieId?.forEach(screen => {
  //   screen.selectedMovies.forEach(movie => {
  //     console.log('inside dateTime.date---===========', movie)
  //     if (movie?.movieId?._id === movieId) {
  //       movie.selectedDateTimes.forEach(dateTime => {
  //         if (dateTime.date === selectedDate) {
  //           selectedTimesArray.push(...dateTime.selectedTimes);
  //         }
  //       });
  //     }
  //   });
  // });

  // console.log(selectedTimesArray, 'selected Times array');

  return (
    <>
      <h1 className='text-white font-roboto font-bold text-3xl px-10 pt-4 pb-4 border-b border-gray-700'>{movie[0]?.title}</h1>
      <div className='pt-6'>
        <div className='ps-20 pb-4'>
          <SelectDates handleChange={handleDateSelect} selectedDate={selectedDate} />
        </div>
        <div className='bg-white py-3 flex justify-between'>
          <div className='ps-16'>
            <span className='text-xl font-roboto font-bold'>Theatre</span>
          </div>
          <div>
            <span className='text-xl font-roboto font-bold'> Screen and Time</span>
          </div>
          <div>

          </div>
        </div>
        <div className='flex flex-col'>
          {
            theatres.map((theatre: ITheatre, index: number) => (
              <div key={index} className=' bg-slate-500 flex items-center justify-between p-10'>
                <div className='flex  items-center'>
                  <span className='font-roboto font-bold text-white'>{theatre.username}</span>
                </div>
                <div className='flex flex-col justify-start pb-2 gap-2'>
                  {theatre.screens.map((screen, index1) => (
                    <div className=' flex ' key={index1}>
                      {screen.selectedMovies.map((movie, index2) => (
                        movie?.movieId?._id === movieId ? (
                          <div className='flex gap-8 justify-start items-center ' key={`${index1}-${index2}`}>
                            <span className='text-white'>{screen.screenName} : </span>
                            {movie.selectedDateTimes.map((date, index3) => (
                              date.date === selectedDate ? (
                                date.selectedTimes.map((time, index4) => (
                                  <span className='text-white bg-black border border-white px-3 py-2 rounded-md cursor-pointer' key={`${index1}-${index2}-${index3}-${index4}`}>
                                    {time.hour} : {time.min}
                                  </span>
                                ))
                              ) : null
                            ))}
                          </div>
                        ) : null
                      ))}
                    </div>
                  ))}
                </div>
                <div>

                </div>
              </div>
            ))
          }

        </div>
      </div>
    </>
  );
}

export default UserTicketBooking;
