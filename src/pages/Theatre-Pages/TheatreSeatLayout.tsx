import React, { useEffect, useState } from 'react'
import { generateSeats } from '../../utils/gernerateSeats';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setSeatLayout } from '../../redux/actions/adminActions';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { IUserSelector } from '../../interface/IUserSlice';

const TheatreSeatLayout = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seats, setSeats] = useState<any>([]);
  const [rows, setRows] = useState<number>(1);
  const [columns, setColumns] = useState<any>([1]);
  const [theatreData, setTheatreData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const theatreId = useSelector((state: IUserSelector) => state.user?.user?._id);

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { screenName , id} = useParams();
  useEffect(() => {
    const data = {
      seats: generateSeats(Array(rows).fill(4), columns),
    };
    setTheatreData(data);
  }, [rows, columns]);

  console.log(theatreData, 'seats inside state')
  const handleColumnChange = (index: number, value: number) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };

  const handleRowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0 && value <= 10) {
      setRows(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Number of rows must be between 1 and 10');
    }
  };

  const handleSubmit = async () => {
    const data = {
      theatreData,
      screenId : id,
      theatreId
    }
    const response: any = await dispatch(setSeatLayout(data))
    console.log(response)
    if (response?.type == "theatre/setSeatLayout/fulfilled" ) {
      toast.success('layout added')
      navigate("/theatre/settings")
    } else if(response?.error?.message == 'Rejected') {
      toast.error(response.payload)
    }
  }

  return (
    <div className='ps-3 overflow-x-hidden'>
      <div className='flex justify-center'>
        <div className='shadow-lg  shadow-orange-300 text-center cursor-pointer bg-white rounded-md w-1/3 h-44 py-3 flex flex-col justify-center items-center'>
          <h1 className="text-black font-roboto text-2xl font-bold">Screen Here</h1>
          <h1 className="text-black ">{screenName}</h1>
        </div>
      </div>
      <div className='flex gap-10'>
        <h1 className='text-white py-4'>Enter the Number of Rows</h1>
        <input className='p-2 my-3 rounded-md outline-blue-500' type="number" value={rows} onChange={handleRowChange} />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {Array.isArray(theatreData?.seats) && theatreData?.seats.map((row: any, rowIndex: number) => (
        <div className='flex mt-2' key={rowIndex}>
          <input className='h-12 mt-2.5 rounded-md outline-blue-500' type="number" defaultValue={0} value={columns[rowIndex]} onChange={(e) => handleColumnChange(rowIndex, Number(e.target.value))} />
          {row.map((seat: any, seatIndex: number) => (
            <div className='text-white' key={seatIndex}>
              <button
                className={`border border-white my-3 w-16 mx-1.5  p-2 rounded-md ${JSON.stringify(seats) === JSON.stringify(seatIndex) ? 'bg-green-500' : 'hover:bg-white/20'
                  }`}>
                {seat.number}
              </button>
            </div>
          ))}
        </div>
      ))}
      <div className='text-center'>
        <button onClick={handleSubmit} className='bg-red-600 px-2 py-2 text-white rounded-md'>SUBMIT</button>
      </div>
    </div>
  );
};

export default TheatreSeatLayout;