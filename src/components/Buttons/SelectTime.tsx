import { ITime } from "../../interface/ITheatreMovie";


const SelectTime = ({times}: any) => {
  
  return (
    <>
    <div className='gap-14 flex flex-row'>
      {times.map((time:ITime, index: number) => (
          <button
            type='button'
            key={index}
            // onClick={() => handleChange(time)}
            className={`rounded-lg border border-white px-3 py-2 'bg-transparent text-white hover:text-black hover:bg-white'}`}
          >
            {time.hour} : {time.min}
          </button>
      ))}
      </div>
    </>
  )
}

export default SelectTime