import { useState } from "react";
import useFetchData from "../../hooks/FetchData";
import QRCode from 'react-qr-code';

const UserTicketsPage = () => {
  const [selected, setSelected] = useState('upcoming');
  const { data: tickets } = useFetchData('/payment/listTickets');
  console.log("🚀 ~ file: UserTicketsPage.tsx:5 ~ UserTicketsPage ~ tickets:", tickets);


  // Filter tickets based on selected status
  const filteredTickets = selected === 'upcoming'
    ? tickets.filter((ticket: any) => ticket.ticketStatus === true)
    : tickets.filter((ticket: any) => ticket.ticketStatus !== true);

  let formattedTime: any

  const changeDate = (dateToChange: Date) => {
    const date = new Date(dateToChange);

    // Convert to IST (Indian Standard Time) and get only the date
    const istDate = date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

    return istDate
  }

  const changeTime = (ticket: any) => {
    const formattedHour = ticket.hour % 12 || 12;

    const period = ticket.hour < 12 ? 'AM' : 'PM';

    formattedTime = `${formattedHour.toString().padStart(2, '0')}:${ticket.min.toString().padStart(2, '0')} ${period}`;
    return formattedTime

  }
  return (
    <div className="pt-20">
      <div>
        <h1 className="text-3xl text-white font-bold text-center"> Tickets</h1>
        <div className="flex gap-6 justify-center pt-6">
          <button className={`py-2 px-4 rounded-lg  text-white ${selected === 'upcoming' ? 'bg-green-500 border-white border-2' : ''}`} onClick={() => setSelected('upcoming')}>
            Upcoming
          </button>
          <button className={`py-2 px-4 rounded-lg border-white -2 text-white ${selected === 'expired' ? 'bg-green-500 border-white border-2' : ''}`} onClick={() => setSelected('expired')}>
            Expired
          </button>
        </div>
        <div className="flex justify-evenly gap-3 flex-wrap pt-6">
          {
            filteredTickets.map((ticket: any, index: number) => (
              <div className="border-white bg-gradient-to-r w-1/4 from-black to-gray-800 py-3 px-10  border-2 rounded-md flex flex-col h-fit gap-4" key={index}>
                <div className="flex justify-between">
                  <div className="">
                    <h1 className="text-white text-lg"> Date </h1>
                    <h1 className="text-white text-2xl"> {changeDate(ticket.date)}</h1>
                  </div>
                  <div>
                    <h1 className="text-white text-right text-lg"> Cost </h1>
                    <h1 className="text-white text-2xl"> ₹{ticket.total}.00</h1>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="">
                    <h1 className="text-white text-lg"> Movie </h1>
                    <h1 className="text-white text-2xl"> {ticket.movieId.title}</h1>
                  </div>
                  <div className="">
                    <h1 className="text-white text-lg"> Theatre </h1>
                    <h1 className="text-white text-2xl"> {ticket.theatreId.username}</h1>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between ">
                    <h1 className="text-white text-lg"> Ticket ({ticket.ticket.length}) </h1>
                    <h1 className="text-white text-lg"> Time </h1>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-4 ">
                      {
                        ticket.ticket.map((seat: string, index1: number) => (
                          <div className="" key={index1}>
                            <h1 className="text-white text-2xl">{seat}</h1>
                          </div>
                        ))
                      }
                    </div>
                    <div>
                      {
                        <h1 className="text-white text-2xl">{changeTime(ticket)}</h1>
                      }
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <QRCode size={170} value={JSON.stringify(ticket)} />
                </div>
                {/* <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-6 text-white p-3 text-2xl"> Download Ticket
                </button> */}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default UserTicketsPage;
