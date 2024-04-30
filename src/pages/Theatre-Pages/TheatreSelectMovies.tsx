import useFetchData from '../../hooks/FetchData';
import TableComponent from '../../components/Table/TableComponent';
import { IMovie, IScreen } from '../../interface/ITheatreMovie';
import { RiEyeLine } from 'react-icons/ri';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import BeatLoader from 'react-spinners/BeatLoader';
import dayjs from 'dayjs';
import { AiFillCloseSquare } from 'react-icons/ai';
import { Toaster, toast } from 'react-hot-toast';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useFormik } from 'formik';
import { selectMoviesValidation } from '../../schemas/selectMovieValidation';
import { listTheatre, selectMovies } from '../../redux/actions/adminActions';
import { IAdminSelector, IUserSelector } from '../../interface/IUserSlice';
import { makeErrorDisable } from '../../redux/reducers/admin/adminSlice';


interface SelectedTime {
  hour: number;
  min: number;
}
interface SelectedDate {
  day: number;
  month: number;
  year: number;
}
const initialValues = {
  selectedDates: [] as SelectedDate[],
  selectedTimes: [] as SelectedTime[],
  selectedLanguages: "",
  selectedFormats: [] as string[],
  selectedScreens: [] as string[],
  movieId: "",
  theatreId: "",
}

const TheatreSelectMovies = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [clock, setClock] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<dayjs.Dayjs[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs[]>([]);
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  const { data: movies } = useFetchData('/movie/listTheatreMovies');
  const tableHead = ['Movie name', 'Date Of Release', 'View'];
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: IAdminSelector) => state.admin);
  const screens: IScreen[] | null = useSelector((state: IAdminSelector) => state.admin.theatreDetails?.screens);
  const { theatreDetails } = useSelector((state: IAdminSelector) => state.admin);
  console.log(screens, 'screens--==')


  useEffect(() => {
    if (!open) {
      setClock(false);
      setSelectedTimes([]);
    }
  }, [open]);

  useEffect(() => {
    console.log(error, '-error')


    if (error) {
      toast.error(error)
      setTimeout(() => {
        dispatch(makeErrorDisable());
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const currentDate = dayjs()

  const { data: movieData } = useFetchData(
    selectedMovieId ? `/movie/findMovie/${selectedMovieId}` : ''
  );

  const { values, touched, handleChange, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: selectMoviesValidation,
    onSubmit: async (values, action) => {
      console.log(movieData, '--movie Data')
      values.movieId = movieData[0]._id;
      values.theatreId = id
      const response = await dispatch(selectMovies(values))
      console.log(response, theatreDetails, '---- response and theatre details ');

      // dispatch(setTheatreDetails(response.payload))
      dispatch(listTheatre(id))
      console.log(theatreDetails, '==theatre details')
      if (response) {
        action.resetForm()
        setOpen(false)
      }
    }
  })

  const handleTimeChange = (time: any) => {
    if (selectedTimes.some((selectedTime) => selectedTime.isSame(time))) {
      toast.error('Same time cannot be selected multiple times.');
    } else {
      setSelectedTimes((prevTimes) => {
        const newTimes = [...prevTimes, time];
        const formattedTimes: SelectedTime[] = newTimes.map(time => ({
          hour: time.get('hour'),
          min: time.get('minute')
        }));
        setFieldValue('selectedTimes', formattedTimes);
        return newTimes;
      });
    }
  };

  const handleDateChange = (dates: any) => {
    const formattedDates: SelectedDate[] = dates.map((date: any) => ({
      day: date.get('date'),
      month: date.get('month'),
      year: date.get('year')
    }));

    setSelectedDates(dates);
    setFieldValue('selectedDates', formattedDates);
    setClock(true);
  };



  const handleDelete = (index: number) => {
    setSelectedTimes(prevTimes => prevTimes.filter((time, i) => i !== index));
  };

  const HandleClick = async (id: any) => {
    setSelectedMovieId(id);
    setIsLoading(true)
    setOpen(true);
    setIsLoading(false)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const filteredMovies = movies.map((movie: IMovie) => ({
    name: movie.title,
    dateOfRelease: movie.dateOfRelease,
    view: <RiEyeLine className='cursor-pointer' onClick={() => HandleClick(movie._id)} />
  }))

  return (
    <>
      <TableComponent data={filteredMovies} tableHead={tableHead} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Toaster />
        <DemoContainer components={['SingleInputDateRangeField', 'StaticTimePicker']}>
          {
            isLoading ? (
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
            ) : (
              open && (
                <>
                  <Modal handleClose={handleClose} open={open} >
                    <Toaster />
                    <form onSubmit={handleSubmit} >
                      <div>
                        <h1 className='text-white font-roboto text-xl font-semibold'>Movie Name: {movieData[0]?.title}</h1>
                        <div className='flex gap-10 pb-4'>
                          <div className='w-1/3 '>
                            <img className='object-cover rounded-lg pt-5' src={movieData[0]?.image} alt="" />
                          </div>
                          <div className='pt-4 flex gap-10'>
                            <div className='flex flex-col gap-4'>
                              <h1 className='text-white'>Select the dates :</h1>
                              <DateRangePicker
                                onAccept={handleDateChange}
                                className='bg-white rounded-md'
                                slots={{ field: SingleInputDateRangeField }}
                                minDate={currentDate}
                                name="allowedRange"
                              // value={[values.selectedDates[0] ?? null, values.selectedDates[1] ?? null]}
                              // onChange={(value) => setFieldValue('selectedDates', value)}
                              />
                              {errors.selectedDates && touched.selectedDates && (
                                typeof errors.selectedDates === 'string' ? (
                                  <p className='text-red-700'>{errors.selectedDates}</p>
                                ) : (
                                  Object.values(errors.selectedDates).map((error, index) => (
                                    <p key={index} className='text-red-700'>{error}</p>
                                  ))
                                )
                              )}
                              {/* <div>
                                <h1 className='text-white'>Available Languages :</h1>
                                <FormGroup>
                                  <input
                                    type="text"
                                    id="selectedLanguages"
                                    name="selectedLanguages"
                                    className="mt-1 p-2 w-full border rounded-md"
                                    placeholder="Enter available languages"
                                    value={values.selectedLanguages}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  />
                                </FormGroup>
                                {errors.selectedLanguages && touched.selectedLanguages ? (<p className='text-red-700'>{errors.selectedLanguages}</p>) : null}
                              </div> */}
                              <div>
                                <h1 className='text-white'>Select Format :</h1>
                                <FormGroup>
                                  {movieData[0]?.format?.map((format: string, index: number) => (
                                    <div key={index}>
                                      <FormControlLabel
                                        className='text-white'
                                        control={
                                          <Checkbox
                                            checked={values.selectedFormats.includes(format)}
                                            onChange={handleChange}
                                            name='selectedFormats'
                                            value={format}
                                          />
                                        }
                                        label={format}
                                      />
                                    </div>
                                  ))}
                                  {errors.selectedFormats && touched.selectedFormats ? (<p className='text-red-700'>{errors.selectedFormats}</p>) : null}
                                </FormGroup>
                              </div>
                              <div>
                                <h1 className='text-white'>Select Screen :</h1>
                                <FormGroup>
                                  {screens?.map((screen: IScreen, index: number) => (
                                    <div key={index}>
                                      <FormControlLabel
                                        className='text-white'
                                        control={
                                          <Checkbox
                                            checked={values.selectedScreens.includes(screen?.screenName)} // You need to provide a boolean value here
                                            onChange={handleChange}
                                            name='selectedScreens'
                                            value={screen.screenName}
                                          />
                                        }
                                        label={screen.screenName}
                                      />
                                    </div>
                                  ))}
                                  {errors.selectedScreens && touched.selectedScreens ? (
                                    <p className='text-red-700'>{errors.selectedScreens}</p>
                                  ) : null}
                                </FormGroup>
                              </div>
                            </div>
                            {
                              clock &&
                              <div>
                                <h1 className='text-white'>Select times of shows :</h1>
                                <StaticTimePicker
                                  defaultValue={dayjs('2022-04-17T15:30')}
                                  className="border rounded-md p-2"
                                  onAccept={handleTimeChange}
                                />
                                {errors.selectedTimes && touched.selectedTimes && (
                                  typeof errors.selectedTimes === 'string' ? (
                                    <p className='text-red-700'>{errors.selectedTimes}</p>
                                  ) : (
                                    Object.values(errors.selectedTimes).map((error, index) => (
                                      <p key={index} className='text-red-700'>{error}</p>
                                    ))
                                  )
                                )}
                              </div>
                            }
                            <div>
                              <h2 className='text-white'>Selected Times:</h2>
                              <ul className='flex flex-col gap-2'>
                                {selectedTimes.map((time, index) => (
                                  <li className='text-black text-center bg-white px-3 py-2 rounded-md relative ' key={index}>
                                    <AiFillCloseSquare className='absolute -top-1 -right-2 text-red-500 bg-black cursor-pointer' onClick={() => handleDelete(index)} />
                                    {time.format('HH:mm')}
                                  </li>
                                ))}
                              </ul>
                            </div>

                          </div>
                        </div>
                        <div className='text-center'>
                          <button type='submit' className='bg-red-600 p-3 rounded-md'>Add movie</button>
                        </div>
                      </div>
                    </form>
                  </Modal>
                </>
              )
            )
          }
        </DemoContainer>
      </LocalizationProvider>
    </>
  )
}

export default TheatreSelectMovies