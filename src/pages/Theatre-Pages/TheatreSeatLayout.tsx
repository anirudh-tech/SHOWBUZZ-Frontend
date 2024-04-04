import React, { useEffect, useState } from 'react'
import { generateSeats } from '../../utils/gernerateSeats';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setSeatLayout } from '../../redux/actions/adminActions';

const TheatreSeatLayout = () => {
  const [seats, setSeats] = useState<any>([]);
  const [rows, setRows] = useState<number>(1);
  const [columns, setColumns] = useState<any>([1]);
  const [theatreData, setTheatreData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const data = {
      seats: generateSeats(Array(rows).fill(4), columns),
    };
    setTheatreData(data);
  }, [rows, columns]);

  console.log(theatreData,'seats inside state')
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

  const handleSubmit = () => {
    dispatch(setSeatLayout(theatreData))
  }

  return (
    <div className='ps-3 overflow-x-hidden'>
      <div className='flex gap-10'>
        <h1 className='text-white py-4'>Enter the Number of Rows</h1>
        <input className='p-2 my-3' type="number" value={rows} onChange={handleRowChange} />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className='text-center'>
        <div className='border-b-2'>
          <h1 className='text-white '>SCREEN THIS WAY</h1>
        </div>
      </div>
      {Array.isArray(theatreData?.seats) && theatreData?.seats.map((row: any, rowIndex: number) => (
        <div className='flex' key={rowIndex}>
          <input className='p-2 me-4' type="number" defaultValue={0} value={columns[rowIndex]} onChange={(e) => handleColumnChange(rowIndex, Number(e.target.value))} />
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