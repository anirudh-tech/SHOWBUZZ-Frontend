import { ITime } from "../../interface/ITheatreMovie";

interface IDate {
  date: string;
  selectedTimes: ITime[]
}
interface Props {
  handleChange: any;
  selectedDate: string | null;
  selectedTime: ITime
  dates: IDate[];
}
const SelectTime = ({dates, selectedDate, selectedTime, handleChange}: Props) => {
const filteredDateData = dates.filter((item) => item.date === selectedDate);
  
    

  return (
    <>
    <div className='gap-14 flex flex-row'>
      {filteredDateData[0]?.selectedTimes.map((time, index) => (
          <button
            type='button'
            key={index}
            onClick={() => handleChange(time)}
            className={`rounded-lg border border-white px-3 py-2   ${selectedTime === time ? 'bg-green-400 text-white' : 'bg-transparent text-white hover:text-black hover:bg-white'}`}
          >
            {time.hour} : {time.min}
          </button>
      ))}
      </div>
    </>
  )
}

export default SelectTime