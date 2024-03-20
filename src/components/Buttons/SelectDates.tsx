import { format, addDays } from "date-fns"


interface Props {
  handleChange: any;
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}

const SelectDates = ({handleChange, selectedDate, setSelectedDate}: Props) => {

  const currentDate = Date.now();
  const dates = [];

  for (let i = 0; i < 5; i++) {
    const date = addDays(currentDate, i);
    const formattedDate = format(date, 'dd MMM EEE');
    dates.push(formattedDate);
  }

  const handleDateSelect = (date: any) => {
    setSelectedDate(date === selectedDate ? null : date);
    handleChange(date === selectedDate ? null : date);
  };


  return (
    <>
      <div className='flex gap-4' >
        {dates.map((date, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleDateSelect(date)}
            className={`border border-white  p-4 rounded-md ${selectedDate === date ? 'bg-green-500' : 'hover:bg-white/20'
              }`}
          >
            <div className="text-white text-lg">{date.split(' ')[0]} {date.split(' ')[1]}</div>
            <div className="text-white">{date.split(' ')[2]}</div>
          </button>
        ))}
      </div>
    </>
  )
}

export default SelectDates