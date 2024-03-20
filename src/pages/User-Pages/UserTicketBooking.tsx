import React, { useState } from 'react';
import useFetchData from '../../hooks/FetchData';
import { useParams } from 'react-router-dom';
import TheatreSelectButton from '../../components/Buttons/TheatreSelectButton';
import { bookingValidationSchema } from '../../schemas/bookingValidationSchema';
import { useFormik } from 'formik';
import SelectDates from '../../components/Buttons/SelectDates';
const UserTicketBooking = () => {
  const [selectedTheatre, setSelectedTheatre] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false);



  const { id } = useParams();
  const { data: movie } = useFetchData(`/movie/findMovie/${id}`);
  const { data: theatres } = useFetchData(`/theatre/listTheatres`);
  const { data: time} = useFetchData(`/theatre/listTime/${selectedTheatre}`)

  const initialValues = {
    selectedTheatre: '', // Initial value for selectedTheatre field
  };

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues,
    validationSchema: bookingValidationSchema,
    onSubmit: async (values, action) => {
      setIsLoading(true);
      // Perform form submission logic here
      setIsLoading(false);
      action.resetForm();
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className='text-white font-roboto font-bold text-3xl px-10 pt-10 pb-4 border-b border-gray-700'>{movie[0]?.title}</h1>
        <div className='ps-10 py-6'>
          <h1 className='text-white font-roboto text-xl py-4'>SELECT THEATRES</h1>
          <TheatreSelectButton handleChange={handleChange} selectedTheatre={selectedTheatre} setSelectedTheatre={setSelectedTheatre} theatres={theatres} />
        </div>
        <div className='ps-10 py-6'>
          <h1 className='text-white font-roboto text-xl py-4'>SELECT DATE</h1>
          <SelectDates handleChange={handleChange} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
        <div>
          <button className='bg-red-500 py-3 px-5 text-white rounded-md' type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default UserTicketBooking;
