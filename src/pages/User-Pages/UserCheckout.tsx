import { useEffect, useState } from "react"
import { BiDownArrowCircle, BiUpArrowCircle } from "react-icons/bi";
import { useLocation } from "react-router-dom"
import {loadStripe} from '@stripe/stripe-js';
import { commonRequest } from "../../config/api";
import { config } from "../../config/configuration";

const UserCheckout = () => {
  const [convenienceFee, setConvenienceFee] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [baseAmount, setBaseAmount] = useState(40)
  const [open, setOpen] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)

  const { state } = useLocation()
  console.log("🚀 ~ file: UserCheckout.tsx:5 ~ UserCheckout ~ state:", state)

  const makePayment = async() => {
    const stripe = await loadStripe("pk_test_51P4LmJSIDbcFgJDopVDWAtHRY9VT1wiYyijCNiER3r6dEwOfTmhgweyvR72ib2F1rh84OJH2WfxXfRD2AGwdPg5r00v7y5BqDI")
    const body = {
      cost : state.cost,
      selectedSeats: state.selectedSeats,
      totalAmount: state.totalAmount,
      theatreName: state.theatreName
    }
    const response = await commonRequest('post','/payment/create-checkout-session',config,body)
    console.log("🚀 ~ file: UserCheckout.tsx:26 ~ makePayment ~ response:", response)
    
    const result = stripe?.redirectToCheckout({
      sessionId: response?.data?.id
    })
    console.log(result,'---result')
  }

  useEffect(() => {
    setConvenienceFee(Math.ceil(state.totalAmount * 0.03))
    setTotalAmount(convenienceFee + baseAmount + state.totalAmount)
  }, [state])
  return (
    <div className="flex flex-col mt-24 justify-center items-center w-full">
      <div className="bg-white w-80 p-5  flex flex-col relative">
        <div className="absolute bg-gradient-to-l from-gray-800 to-gray-900  w-5 h-10 -right-0 top-1/2 rounded-s-full"></div>
        <div className="absolute bg-gray-900 w-5 h-10 -left-0 top-1/2 rounded-e-full"></div>
        <div className="">
          <h1 className="text-2xl text-red-800 font-bebas-neue font-extralight">BOOKING SUMMARY</h1>
        </div>
        <div className="mt-6">
          <h1 className="font-roboto font-bold text-xl underline uppercase">{state.theatreName}</h1>
        </div>
        <div className="flex justify-between mt-8 ">
          <div className="flex gap-2">
            <div className="flex flex-col">
              <div className="flex gap-2">
                {
                  state.selectedSeats.map((seatnumber: string, index: number) => (
                    <div className="text-black font-roboto text-sm " key={index}>
                      {
                        seatnumber
                      }
                    </div>
                  ))
                }
                <span className="text-xs">({state.numberOfTicket} tickets)</span>
              </div>
              <span className="text-sm text-gray-500">{state.filteredScreens[0].screenName}</span>
            </div>
          </div>
          <div>
            <span className="text-gray-900 font-semibold">Rs. {state.totalAmount}.00</span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex gap-1">
            {
              open ? (
                <BiUpArrowCircle className="mt-1 cursor-pointer" onClick={() => setOpen(!open)} />
              ) : (
                <BiDownArrowCircle className="mt-1 cursor-pointer" onClick={() => setOpen(!open)} />
              )
            }
            <h1 className="text-sm"> Convenience Fee </h1>
          </div>
          <div>
            <span className="text-gray-900 font-semibold">Rs. {convenienceFee + baseAmount}.00</span>
          </div>
        </div>
        {
          open &&
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-xs"> Base Amount</h1>
              <span className="text-gray-900 text-xs font-semibold">Rs. {baseAmount}.00</span>
            </div>
            <div className="flex justify-between">
              <h1 className="text-xs"> Integrated GST 3%</h1>
              <span className="text-gray-900 text-xs font-semibold">Rs. {convenienceFee}.00</span>
            </div>
          </div>
        }
        <hr className="mt-6" />
        <div className="flex mt-5 justify-between">
          <h1 className="font-bold"> Sub Total </h1>
          <span className="text-gray-900 font-bold">Rs. {totalAmount}.00</span>
        </div>
      </div>
      <div className="bg-lime-200 w-80 p-5 flex flex-col ">
        <div className="flex justify-between">
          <h1 className="font-bold">AMOUNT PAYABLE</h1>
          <h1 className="text-red-700 font-bold">Rs. {totalAmount}.00</h1>
        </div>
        <div className="text-center mt-3">
          <button onClick={() => makePayment()} className="bg-red-500 px-16 text-white py-2 rounded-md">PAY</button>
        </div>
      </div>
    </div>
  )
}

export default UserCheckout