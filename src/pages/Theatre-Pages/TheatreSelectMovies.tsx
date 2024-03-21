import useFetchData from '../../hooks/FetchData';
import TableComponent from '../../components/Table/TableComponent';
import { IMovie } from '../../interface/ITheatreMovie';
import { RiEyeLine } from 'react-icons/ri';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import BeatLoader from 'react-spinners/BeatLoader';
import dayjs from 'dayjs';
import { AiFillCloseSquare } from 'react-icons/ai';
import { Toaster, toast } from 'react-hot-toast';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../redux/store';
import { useFormik } from 'formik';
import { selectMoviesValidation } from '../../schemas/selectMovieValidation';


const selectedLanguages: string[] = []
interface SelectedTime{
  hour: number;
  min: number;
}
interface SelectedDate{

}
const initialValues = {
  selectedDates: [] as SelectedTime[],
  selectedTimes: []  as SelectedDate[],
  selectedLanguages: selectedLanguages,
  selectedFormats: [] as string[],
}

const TheatreSelectMovies = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [clock, setClock] = useState(false)
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<dayjs.Dayjs[]>([]);
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs[]>([]);
  const { data: movies } = useFetchData('/movie/listTheatreMovies');
  const tableHead = ['Id', 'Movie name', 'Date Of Release', 'View'];
  // const dispatch = useDispatch<AppDispatch>();

  const currentDate = dayjs()

  const { data: movieData } = useFetchData(
    selectedMovieId ? `/movie/findMovie/${selectedMovieId}` : ''
  );

  const { values,  handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: selectMoviesValidation,
    
    onSubmit: async (values, action) => {
      try {
        console.log(selectedDates,'-----')
        // console.log(values.selectedDates,"==>")
        // values.selectedDates = selectedTimes.forEach(time => {
        //   selectedTimes.push({ hour: time.get('hour'), min: time.get('minute') });
        // });
        const dates = []
        selectedDates.forEach(time => {
          dates.push(time);
        });
        values.selectedDates = dates

        const times: SelectedTime[] = []
        selectedTimes.forEach(time => {
          times.push({ hour: time.get('hour'), min: time.get('minute') });
        });
        values.selectedTimes = times
        // selectMoviesValidation.validate(values)
        console.log(values,action,'=====>')
      } catch (error) {
        console.log(error);
      }
    }
  })

  const handleTimeChange = (time: any) => {
    if (selectedTimes.some((selectedTime) => selectedTime.isSame(time))) {
      toast.error('Same time cannot be selected multiple times.');
    } else {
      setSelectedTimes((prevTimes) => [...prevTimes, time]);
    }
  };
  
    const handleDateChange = (date: any) => {
      setSelectedDates((prevTimes) => [...prevTimes, date]);
      setClock(true)
    }


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
    id: movie._id,
    name: movie.title,
    dateOfRelease: movie.dateOfRelease,
    view: <RiEyeLine className='cursor-pointer' onClick={() => HandleClick(movie._id)} />
  }))


  return (
    <>
    <TableComponent data={filteredMovies} tableHead={tableHead} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                value={[values.selectedDates[0] ?? null, values.selectedDates[1] ?? null]}
                                onChange={(value) => setFieldValue('selectedDates', value)}
                              />
                              <div>
                                <h1 className='text-white'>Available Languages :</h1>
                                <FormGroup>
                                  {movieData[0]?.languagesAvailable?.map((language: string, index: number) => (
                                    <div key={index}>
                                      <FormControlLabel className='text-white' control={<Checkbox
                                        checked={values.selectedLanguages.includes(language)}
                                        onChange={(e) => {
                                          const isChecked = e.target.checked;
                                          if (isChecked) {
                                            setFieldValue('selectedLanguages', [...values.selectedLanguages, language]);
                                          } else {
                                            setFieldValue('selectedLanguages', values.selectedLanguages.filter((lang: string) => lang !== language));
                                          }
                                        }}
                                      />} label={language} />
                                    </div>
                                  ))}
                                </FormGroup>
                              </div>
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