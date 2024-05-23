import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData";
import { useSelector } from "react-redux";
import { IUserSelector } from "../../interface/IUserSlice";
import { FaTicketAlt } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Tooltip,  Legend, XAxis, YAxis } from "recharts";

function TheatreHome() {
  const [payments, setPayments] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [timeFrame, setTimeFrame] = useState<string>('monthly');
  const Month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', ' Oct', 'Nov', 'Dec']
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);

  const prepareCompanyData = () => {
    const monthsData: { [key: string]: number } = {};

    payments.forEach((payment: any) => {
      const paymentDate = new Date(payment.createdAt);
      let monthName = '';

      if (timeFrame === 'monthly') {
        monthName = Month[paymentDate.getMonth()];
      } else if (timeFrame === 'weekly') {
        monthName = `Week ${getWeekNumber(paymentDate)}`;
      } else if (timeFrame === 'yearly') {
        monthName = `${paymentDate.getFullYear()}`;
      }

      if (monthsData[monthName]) {
        monthsData[monthName]++;
      } else {
        monthsData[monthName] = 1;
      }
    });

    // Format data for the line chart
    const lineChartData = Object.keys(monthsData).map((monthName) => ({
      month: monthName,
      Payments: monthsData[monthName],
    }));
    console.log("🚀 ~ file: AdminDashboard.tsx:46 ~ lineChartData ~ lineChartData:", lineChartData)

    return lineChartData;
  };

  const getWeekNumber = (date: Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const differenceInTime = date.getTime() - oneJan.getTime();
    return Math.ceil((differenceInTime / (1000 * 3600 * 24 * 7)) + 1);
  };

  useEffect(() => {
    const fetchingData = async () => {

      const payments = await fetchData(`/payment/getAllPaymentsOfTheatre/${id}`)
      console.log("🚀 ~ file: AdminDashboard.tsx:112 ~ fetchingData ~ payments:", payments)
      setPayments(payments.data.payments)
      setTotalAmount(payments.data.totalAmount)
    }
    fetchingData()
  }, [])

  const data = prepareCompanyData();
  return (
    <>
      <div className="p-4 pt-16">
        <div className="flex justify-center py-2">
          <h1 className="text-white text-3xl font-bold">Over all Data</h1>
        </div>
        <div className='grid  md:grid-cols-2 gap-3 grid-cols-2 py-5'>
          <div className="bg-gray-800 p-5 rounded flex flex-col">
            <div className="flex gap-10">
              <h1 className="text-lg font-bold text-white">Total Tickets Sold</h1>
              <FaTicketAlt className="text-red-500 text-4xl" />
            </div>
            <div>
              {
                payments && (
                  <>
                    <div>
                      <h1 className="text-white text-4xl font-bold pl-4">{payments.length}</h1>
                    </div>
                  </>
                )
              }
            </div>
          </div>
          <div className="bg-gray-800 p-5 rounded flex flex-col">
            <div className="flex gap-10">
              <h1 className="text-lg font-bold text-white">Total Revenue</h1>
              <SiCashapp className="text-orange-500 text-4xl" />
            </div>
            <div>
              {
                totalAmount && (
                  <>
                    <div>
                      <h1 className="text-white text-4xl font-bold pl-4"> ₹{totalAmount}</h1>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
        <div className="flex justify-center py-4">
          <h1 className="text-white text-3xl font-bold">Payments</h1>
        </div>
        <div className="flex justify-center mt-6 py-2">
          <select
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="flex ">
          <div>

            <AreaChart width={730} height={250} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="Payments" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </div>
          <div className="pt-8">
            <BarChart width={730} height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Payments" fill="#8884d8" />

            </BarChart>
          </div>
        </div>
      </div>
    </>
  )
}

export default TheatreHome