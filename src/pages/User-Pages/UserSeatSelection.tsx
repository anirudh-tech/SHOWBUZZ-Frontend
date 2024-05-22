import { useLocation, useNavigate } from "react-router-dom"
import Modal from "../../components/Modal/Modal"
import car from '../../assets/car.webm'
import cycle from '../../assets/cycle.webm'
import bike from '../../assets/bike.webm'
import van from '../../assets/van.webm'
import { useEffect, useRef, useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import fetchData from "../../utils/fetchData"
import toast from "react-hot-toast"

const UserSeatSelection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [openDraw, setOpenDraw] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [timeData, setTimeData] = useState<any>({});
  const [numberOfSeats, setNumberOfSeats] = useState<number>(1);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { state } = useLocation()
  const navigate = useNavigate()
  const array = Array(9).fill(null).map((_, index) => index + 1);
  const timeId = state.time._id
  const time = timeData?.seatsAvailable
  useEffect(() => {
    const fetchingData = async () => {
      const { data } = await fetchData(`/theatre/times/${timeId}`)
      setTimeData(data)
    }
    fetchingData()
  }, [])
  useEffect(() => {
    if (selectedSeats.length == 0) {
      setOpenDraw(false)
    }
    setTotalAmount(selectedSeats.length * state.cost)

  }, [selectedSeats])
  useEffect(() => {
    if (numberOfSeats == 1) {
      setUrl(cycle)
    } else if (numberOfSeats == 2) {
      setUrl(bike)
    } else if (numberOfSeats <= 4) {
      setUrl(car)
    } else {
      setUrl(van)
    }
  }, [numberOfSeats])

  const handleNumberClick = (number: number) => {
    setNumberOfSeats(number)
  }
  const handleOkClick = () => {
    setIsOpen(false)
  }
  const handleModalClick = () => {
    setIsOpen(true)
  }
  const handleSelectSeat = (seat: string) => {
    setOpenDraw(true)
    if (!selectedSeats.includes(seat)) {
      if (selectedSeats.length == numberOfSeats) {
        toast.error(`Can only select ${numberOfSeats} seats`)
        return;
      } else {
        setSelectedSeats((prevState) => [...prevState, seat])
      }
    } else {
      setSelectedSeats((prevState) => prevState.filter(s => s !== seat))
    }
  }
  const handlePay = () => {
    state.numberOfTicket = selectedSeats.length;
    state.totalAmount = totalAmount;
    state.selectedSeats = selectedSeats;
    navigate('checkout', { state });
  }



  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    videoRef.current?.play()
  }, [videoRef])
  return (
    <div className={`${openDraw ? 'h-[90vh] overflow-y-hidden' : ''} pt-20`}>
      {
        isOpen &&
        <Modal open={isOpen}>
          {
            <div className="flex flex-col gap-3">
              <div className="text-center">
                <h1 className="text-xl font-roboto font-bold  p-6 text-green-500">SELECT THE NUMBER OF SEATS</h1>
              </div>
              <div>
                <video src={url} autoPlay={true} loop className="w-full h-48" ref={videoRef}></video>
              </div>
              <div className="flex gap-2 text-white items-center justify-center" >
                {
                  array.map((element, index) => (
                    <button className={` p-3 px-5 rounded-full  ${index + 1 == numberOfSeats ? 'bg-red-500' : ''
                      }`} onClick={() => handleNumberClick(index + 1)}>
                      {element}
                    </button>
                  ))
                }
              </div>
              <div className="text-center">
                <button onClick={() => handleOkClick()} className="text-white bg-green-700 p-3 rounded-full">OK</button>
              </div>
            </div>
          }
        </Modal>
      }

      <div onClick={() => handleModalClick()} className="flex justify-end pe-4">
        <button className="border px-3 py-2 rounded-full flex gap-2 text-white">
          <AiOutlineEdit className="mt-1" />
          <span className="text-white font-roboto  ">{numberOfSeats} Tickets </span>
        </button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='shadow-lg  shadow-orange-300 text-center cursor-pointer bg-white rounded-t-full rounded-md w-1/3 h-2 py-3 flex flex-col justify-center items-center'>

        </div>
        <h1 className="text-white">Screen This Way</h1>
      </div>
      <div className={`flex flex-col gap-3  mt-16 ${openDraw ? 'overflow-auto h-[55vh] mb-5': ''}  `}>
        {
          time?.rows.map((row: any, index1: number) => (
            <div key={index1} className="flex gap-5 justify-center ">
              {
                row.map((column: any, index2: number) => (
                  <button disabled={column.booked} onClick={() => handleSelectSeat(column.number)} className={` flex justify-center items-center rounded-t-md p-2 w-8 text-xs ${column.booked ? 'bg-white/20 text-white cursor-not-allowed' : 'border shadow-md  shadow-green-300'} ${selectedSeats.includes(column.number) ? 'bg-green-700 text-white' : 'bg-white text-black'}`} key={index2}>
                    <span className="font-roboto font-semibold text-center">{column.number}</span>
                  </button>
                ))
              }
            </div>
          ))
        }
      </div>
        {
          openDraw &&
          
            <div className="bg-white absolute bottom-0 py-6 rounded-md text-center">
              <button onClick={() => handlePay()} className="bg-red-500 px-20 py-3 rounded-lg text-white">Pay ₹{totalAmount}</button>
            </div>
          
        }
    </div>
  )
}

export default UserSeatSelection