import { format } from "date-fns"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

interface IDate {
  date: string
}
interface Props {
  handleChange: any;
  selectedDate: string | null;
  dates: IDate[];
}

const SelectDates = ({ handleChange, selectedDate, dates }: Props) => {
  const [endDate, setEndDate] = useState<number>(5)
  const [startDate, setStartDate] = useState<number>(0)

  // const handleDateSelect = (date: any) => {
  //   setSelectedDate(date === selectedDate ? null : date);
  //   handleChange(date === selectedDate ? null : date);
  // };
  

  const changeDate = (value: string) => {
    if (value === 'right') {
      if (endDate == dates.length) {
        toast.error('No more available dates!');
        return;
      }
      setEndDate(endDate + 1);
      setStartDate(startDate + 1);
    } else {
      if (startDate === 0) {
        return;
      }
      setEndDate(endDate - 1);
      setStartDate(startDate - 1);
    }
  }
  const visibleDates = dates.slice(startDate, endDate);
  console.log(visibleDates, 'dates--------')

  return (
    <>
      <div className='flex gap-4' >
        <Toaster />
        <button type="button" onClick={() => changeDate('left')}>
          <AiOutlineLeftCircle className="text-white text-3xl" />
        </button>
        {visibleDates.map((date, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleChange(date.date)} 
            className={`border border-white p-4 rounded-md ${selectedDate === date.date ? 'bg-green-500' : 'hover:bg-white/20'}`}
          >
            <div className="text-white text-lg">{format(new Date(date.date), 'dd MMM')}</div>
            <div className="text-white">{format(new Date(date.date), 'EEE')}</div>
          </button>
        ))}
        <button type="button" onClick={() => changeDate('right')} className="">
          <AiOutlineRightCircle className="text-white text-3xl" />
        </button>
      </div>
    </>
  )
}

export default SelectDates