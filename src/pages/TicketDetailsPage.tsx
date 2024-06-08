import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import fetchData from "../utils/fetchData"

const TicketDetailsPage = () => {
  const { id } = useParams()
  const [ticket, setTicket] = useState(null)
  useEffect(() => {
    const fetchingData = async () => {
      const { data } = await fetchData(`/payment/ticketDetails/${id}`)
      setTicket(data)
      console.log("🚀 ~ file: TicketDetailsPage.tsx:12 ~ fetchingData ~ data:", data)
    }
    fetchingData()
  }, [id])

  const changeDate = (dateToChange: Date) => {
    const date = new Date(dateToChange);

    // Convert to IST (Indian Standard Time) and get only the date
    const istDate = date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

    return istDate
  }

  let formattedTime: any;

  const changeTime = (ticket: any) => {
    const formattedHour = ticket?.hour % 12 || 12;

    const period = ticket?.hour < 12 ? 'AM' : 'PM';

    formattedTime = `${formattedHour?.toString().padStart(2, '0')}:${ticket?.min.toString().padStart(2, '0')} ${period}`;
    return formattedTime

  }

  
  return (
    <div>
      <div className="ticket-details">
        <div className="ticket-image">
          <img src={ticket?.movieId?.image} alt="Ticket" />
        </div>
        <div className="ticket-info">
          {
            ticket?.ticket.map((seat: string, index1: number) => (
              <div className="" key={index1}>
                <h1 className="text-white text-2xl">{seat}</h1>
              </div>
            ))
          }
          <p>Date: {changeDate(ticket?.date)}</p>
          <p>Time: {changeTime(ticket)}</p>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailsPage