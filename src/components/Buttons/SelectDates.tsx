// import { format } from "date-fns"
// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

// interface IDate {
//   date: string
// }
// interface Props {
//   handleChange: any;
//   selectedDate: string | null;
// }

// const SelectDates = ({ handleChange, selectedDate }: Props) => {
//   const [endDate, setEndDate] = useState<number>(5)
//   const [startDate, setStartDate] = useState<number>(0)

//   // const handleDateSelect = (date: any) => {
//   //   setSelectedDate(date === selectedDate ? null : date);
//   //   handleChange(date === selectedDate ? null : date);
//   // };
  

//   const changeDate = (value: string) => {
//     if (value === 'right') {
//       if (endDate == dates.length) {
//         toast.error('No more available dates!');
//         return;
//       }
//       setEndDate(endDate + 1);
//       setStartDate(startDate + 1);
//     } else {
//       if (startDate === 0) {
//         return;
//       }
//       setEndDate(endDate - 1);
//       setStartDate(startDate - 1);
//     }
//   }
//   const visibleDates = dates.slice(startDate, endDate);
//   console.log(visibleDates, 'dates--------')

//   return (
//     <>
//       <div className='flex gap-4' >
//         <Toaster />
//         <button type="button" onClick={() => changeDate('left')}>
//           <AiOutlineLeftCircle className="text-white text-3xl" />
//         </button>
//         {visibleDates.map((date, index) => (
//           <button
//             type="button"
//             key={index}
//             onClick={() => handleChange(date.date)} 
//             className={`border border-white p-4 rounded-md ${selectedDate === date.date ? 'bg-green-500' : 'hover:bg-white/20'}`}
//           >
//             <div className="text-white text-lg">{format(new Date(date.date), 'dd MMM')}</div>
//             <div className="text-white">{format(new Date(date.date), 'EEE')}</div>
//           </button>
//         ))}
//         <button type="button" onClick={() => changeDate('right')} className="">
//           <AiOutlineRightCircle className="text-white text-3xl" />
//         </button>
//       </div>
//     </>
//   )
// }

// export default SelectDates


import { format, addDays } from "date-fns"
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";


interface Props {
  handleChange: any;
  selectedDate: string ;
}

const SelectDates = ({handleChange, selectedDate}: Props) => {
  const [endDate,setEndDate] = useState<number>(5)
  const [startDate, setStartDate] =useState<number>(0)


  const currentDate = Date.now();
  const dates: any[] = [];
  for (let i = startDate; i < endDate; i++) {
    const date = addDays(currentDate, i);
    const formattedDate = format(date, 'dd MMM EEE');
    dates.push(formattedDate);
  }


  const changeDate = (value: string) => {
    if (value === 'right') {
      console.log(addDays(Date.now(),10));
      
      if(dates[4] === format(addDays(Date.now(),10), 'dd MMM EEE')){
        return toast.error('Cannot book tickets after this date')
      }
        setEndDate(endDate + 1);
        setStartDate(startDate + 1);
    } else {
      console.log(dates[0],'1')
      if(dates[0]=== format( Date.now(),'dd MMM EEE')) {
        return
      }
      setEndDate(endDate - 1);
      setStartDate(startDate - 1);
    }
}

  return (
    <>
      <div className='flex gap-4' >
        <Toaster/>
        <button type="button" onClick={()=>changeDate('left')}>
          <AiOutlineLeftCircle className="text-white text-3xl"/>
        </button>
        {dates.map((date, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleChange(date)}
            className={`border border-white  p-2 rounded-md ${format(selectedDate, 'dd MMM EEE') === date ? 'bg-green-500' : 'hover:bg-white/20'
              }`}
          >
            <div className="text-white text-lg">{date.split(' ')[0]} {date.split(' ')[1]}</div>
            <div className="text-white">{date.split(' ')[2]}</div>
          </button>
        ))}
        <button type="button" onClick={()=>changeDate('right')} className="">
          <AiOutlineRightCircle className="text-white text-3xl"/>
        </button>
      </div>
    </>
  )
}

export default SelectDates