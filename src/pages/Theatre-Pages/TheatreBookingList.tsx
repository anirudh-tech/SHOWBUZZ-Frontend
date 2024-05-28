/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllTicketsInTheatres } from '../../redux/actions/adminActions';
import {
  Badge,
  Card,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

import clsx from 'clsx';
import { IUserSelector } from '../../interface/IUserSlice';
import { GiBleedingEye } from 'react-icons/gi';
import Modal from '../../components/Modal/Modal';
import fetchData from '../../utils/fetchData';

const TheatreBookingList = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [tickets, setTickets] = useState<any>([]);
  const [ticketData, setTicketData] = useState<any>({});
  const [openRows, setOpenRows] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);

  useEffect(() => {
    if (id) {
      dispatch(getAllTicketsInTheatres({
        page: activePage,
        limit: 10,
        id
      })).then((response: any) => {
        if (response.payload?.totalPage) {
          setTickets(response.payload?.tickets);
          setTotalPage(response.payload?.totalPage);
        }
      });
    }
  }, [activePage, id, dispatch]);

  const handleRowToggle = async (id: number) => {
    console.log("🚀 ~ file: TheatreBookingList.tsx:48 ~ handleRowToggle ~ id:", id)
    setOpenRows(true);
    const {data} = await fetchData(`/payment/ticketDetails/${id}`)
    setTicketData(data)
    console.log("🚀 ~ file: TheatreBookingList.tsx:51 ~ handleRowToggle ~ data:", data)

  };

  const handleClose = () => {
    setOpenRows(false);
  };

  const isToday = (dateString: string) => {
    console.log("🚀 ~ file: TheatreBookingList.tsx:66 ~ isToday ~ dateString:", dateString)
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const tableHead = ['Username', 'Total Amount Paid', 'Show Date', 'Booked Date', 'Movie Name', 'Theatre Name'];

  return (
    <div className='pt-16'>
      {
        openRows && ticketData &&
        <Modal open={openRows} handleClose={handleClose} >
          <div className='text-white flex flex-col gap-10'>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                User name : {ticketData?.userId?.username}
              </Typography>
              <Typography>
                Total Amount Paid : {ticketData?.total} ₹
              </Typography>
              <Typography>
                Show Date : {ticketData?.createdAt}
              </Typography>
              <Typography>
                Booked Date : {ticketData?.date}
              </Typography>
              <Typography>
                Movie Name : {ticketData?.movieId?.title}
              </Typography>
              <Typography>
                Theatre Name : {ticketData?.theatreId?.username}
              </Typography>
              <Typography>
                Seats: {ticketData?.ticket}
              </Typography>
              <Typography>
                Time : {ticketData?.hour} : {ticketData?.min}
              </Typography>
          </div>
        </Modal>
      }
      <h1 className='text-center text-3xl text-white mt-3'>Admin Ticket Booking List</h1>
      <div className='w-full flex justify-center'>
        <TableContainer className='flex justify-center ms-8 mt-8' component={Paper} style={{ width: '95%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className='bg-gradient-to-l from-gray-700 to-gray-950 shadow-black'>
                {tableHead.map((header: string, index: number) => (
                  <TableCell key={index} className='text-white font-roboto font-bold'>
                    <div className='text-white'>
                      {header}
                    </div>
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets?.map((row: any, index: number) => (
                <Fragment key={index}>
                  <TableRow
                    className={clsx(index % 2 === 0 ? '' : 'bg-violet-200', 'text-white')}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {Object.entries(row).filter(([key, value]) => key !== 'id').map(([key, value]: [string, any], subIndex: number) => (
                      <TableCell key={subIndex}>
                      {key === 'username' && isToday(row.showDate) ? (
                        <Badge className='p-2' badgeContent="Today's Booking" color="error">
                          {value}
                        </Badge>
                      ) : (
                        value
                      )}
                    </TableCell>
                    ))}
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleRowToggle(row.id)}
                      >
                        <GiBleedingEye className='text-red-500' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Stack alignItems={'center'} spacing={2}>
        <Pagination onChange={(_, page) => setActivePage(page)} count={totalPage} variant="outlined" color="primary" />
      </Stack>
    </div>
  );
};

export default TheatreBookingList;
