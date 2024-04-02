import { useEffect, useState } from 'react';
import useFetchData from '../../hooks/FetchData';
import { useParams } from 'react-router-dom';
import TheatreSelectButton from '../../components/Buttons/TheatreSelectButton';
import { useFormik } from 'formik';
import SelectDates from '../../components/Buttons/SelectDates';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { listTheatre } from '../../redux/actions/adminActions';
import { IAdminSelector } from '../../interface/IUserSlice';
import ScreenSelectButton from '../../components/Buttons/ScreenSelectButton';
import { IProps, ITime } from '../../interface/ITheatreMovie';
import SelectTime from '../../components/Buttons/SelectTime';

const initialValues = {
  selectedTheatre: '',
  selectedScreen:'',
  selectedDate:'',
  selectedTime:''
};

const UserTicketBooking = () => {
  const [formikValues, setFormikValues] = useState(initialValues);
  const [selectedTheatre, setSelectedTheatre] = useState<string | null>('');
  const [selectedScreen, setSelectedScreen] = useState<string | null>('');
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [selectedTime, setSelectedTime] = useState<any>(null)
  const dispatch = useDispatch<AppDispatch>()
  const { theatreDetails } = useSelector((state: IAdminSelector) => state.admin);
  const { id } = useParams();
  const { data: movie } = useFetchData(`/movie/findMovie/${id}`);
  const { data: theatres } = useFetchData(`/theatre/listTheatresUsingMovieId/${movie[0]?._id}`);

  console.log(selectedTheatre,'selected Theatre');
  
  const handleTheatreSelect = (theatreId: string) => {
    setSelectedTheatre(theatreId === selectedTheatre ? null : theatreId);
    setFormikValues({ ...formikValues, selectedTheatre: theatreId });
    handleChange({ target: { name: 'selectedTheatre', value: theatreId } });
  };

  const handleScreenSelect = (screenName: string) => {
    if(setSelectedScreen) {
      setSelectedScreen(screenName === selectedScreen ? null : screenName);
    }
    setFormikValues({ ...formikValues, selectedScreen: screenName });
    handleChange({ target: { name: 'selectedScreen', value: screenName } });
  };

  const handleDateSelect = (date: any) => {
    console.log('date----->',date);
    
    setSelectedDate(date);
    setFormikValues({ ...formikValues, selectedDate: date });
    handleChange({ target: { name: 'selectedDate', value: date } });
    console.log(selectedDate,'----selectedDate')
  };

  const handleTimeSelect = (screenTime: ITime) => {
    if(setSelectedTime) {
      setSelectedTime(screenTime === selectedTime ? null : screenTime);
    }
    handleChange({ target: { name: 'selectedTime', value: screenTime } });
  };

  const movieId = movie[0]?._id

  const filteredScreens = theatreDetails?.screens?.filter(screen =>
    screen.selectedMovies.some((movie: IProps) => movie?.movieId?._id === movieId)
  );

  const filteredScreen = filteredScreens?.filter(screen =>
    screen.screenName === selectedScreen
  )


  let filteredMovie: any;

  if(filteredScreen) {
    filteredMovie = filteredScreen[0]?.selectedMovies?.filter((movie) =>
      movie?.movieId?._id === movieId
    )
  }

 
  useEffect(() => {
    dispatch(listTheatre(selectedTheatre))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheatre])



  const { values : formikFormValues, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: bookingValidationSchema,
    onSubmit: async (values, action) => {
      console.log(values,'values')
      action.resetForm();
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const values = { ...formikFormValues, ...formikValues };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className='text-white font-roboto font-bold text-3xl px-10 pt-10 pb-4 border-b border-gray-700'>{movie[0]?.title}</h1>
        <div className='ps-10 py-6'>
          <h1 className='text-white font-roboto text-xl py-4'>SELECT THEATRES</h1>
          <TheatreSelectButton handleChange={handleTheatreSelect} selectedTheatre={selectedTheatre} theatres={theatres} />
        </div>
        {
          selectedTheatre ? (
            <div className='ps-10 py-6'>
              <div>
                <ScreenSelectButton screens={filteredScreens} handleChange={handleScreenSelect} selectedScreen={selectedScreen} />
              </div>
              {
                selectedScreen ? (
                  <div>
                    <div>
                    <h1 className='text-white font-roboto text-xl py-4'>SELECT DATE</h1>
                    <SelectDates dates={filteredMovie[0]?.selectedDateTimes} handleChange={handleDateSelect} selectedDate={selectedDate} />
                    </div>
                    {
                      selectedDate ? (
                        <div>
                          <h1 className='text-white font-roboto text-xl py-4'>SELECT DATE</h1>
                          <SelectTime dates={filteredMovie[0]?.selectedDateTimes} selectedDate={selectedDate} selectedTime={selectedTime} handleChange={handleTimeSelect}/>
                        </div>
                      ) : null
                    }
                  </div>
                  
                ) : null
              }
            </div>
          ) : null
        }
        <div className='text-center'>
          <button className='bg-red-500 py-3 px-5 text-white rounded-md' type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default UserTicketBooking;
