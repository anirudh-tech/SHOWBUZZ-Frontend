import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllTickets } from '../../redux/actions/adminActions';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import clsx from 'clsx';
const AdminTicketBookingList = () => {

  const [activePage, setActivePage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>()
  const { tickets } = useSelector((state: any) => state.admin);
  console.log("🚀 ~ file: AdminTicketBookingList.tsx:13 ~ AdminTicketBookingList ~ tickets:", tickets)


  useEffect(() => {
    dispatch(getAllTickets({
        page: activePage,
        limit: 10
    })).then((response) => {
        console.log("🚀 ~ file: AdminUsersList.tsx:22 ~ useEffect ~ response:", response)
        if (response.payload?.totalPage) {
            setTotalPage(response.payload?.totalPage);
        }
    })
},[activePage])

const tableHead = ['Username', 'Total Amount Paid', 'Show Date', 'Booked Date', 'Movie Name', 'Theatre Name'];

  return (
    <div className='pt-16'>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets?.map((row: any
                        , index: number) => (
                        <TableRow
                            key={index}
                            className={clsx(index % 2 === 0 ? '' : 'bg-violet-200', 'text-white')}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.values(row).map((value: any, subIndex: number) => (
                                <TableCell key={subIndex}>
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
      </div>
      <Stack alignItems={'center'} spacing={2}>
        <Pagination onChange={(_, page) => setActivePage(page)} count={totalPage} variant="outlined" color="primary" />
      </Stack>
    </div>
  )
}

export default AdminTicketBookingList