import React from 'react';
import { ITheatre } from '../../interface/ITheatreMovie';

interface Props {
  theatres: ITheatre[];
  setSelectedTheatre: React.Dispatch<React.SetStateAction<string | null>>;
  selectedTheatre: string | null;
  handleChange: any;
}

const TheatreSelectButton = ({ theatres,setSelectedTheatre,selectedTheatre, handleChange }: Props) => {
  
  const handleTheatreSelect = (theatreId: string) => {
    setSelectedTheatre(theatreId === selectedTheatre ? null : theatreId);
    handleChange({ target: { name: 'selectedTheatre', value: theatreId } });
  };
  return (
    <>
        <div className='gap-14 flex flex-row'>
      {theatres.map((theatre, index) => (
          <button
            type='button'
            key={index}
            onClick={() => handleTheatreSelect(theatre._id)}
            className={`rounded-lg border border-white px-3 py-2   ${selectedTheatre === theatre._id ? 'bg-green-400 text-white' : 'bg-transparent text-white hover:text-black hover:bg-white'}`}
          >
            {theatre.username}
          </button>
      ))}
      </div>
    </>
  );
};

export default TheatreSelectButton;