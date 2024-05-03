/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getAllUsers, updateUserStatus } from '../../redux/actions/adminActions'; // Import the action to update user status

const AdminUsersList = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState(1);
  const [newStatus, setNewStatus] = useState('');
  const [userId, setUserId] = useState('');
  const [open, setOpen] = useState(false);
  const { users } = useSelector((state: any) => state.admin);
  const dispatch = useDispatch<AppDispatch>();
  console.log("🚀 ~ file: AdminUsersList.tsx:8 ~ AdminUsersList ~ users:", users);

  useEffect(() => {
    dispatch(getAllUsers({
      page: activePage,
      limit: 10
    })).then((response) => {
      console.log("🚀 ~ file: AdminUsersList.tsx:22 ~ useEffect ~ response:", response);
      if (response.payload?.totalPage) {
        setTotalPage(response.payload?.totalPage);
      }
    });
  }, [activePage, status, open]);

  const tableHead = ['Customer name', 'Email', 'Date Of joining', 'Status'];

  // Function to toggle user status
  const toggleUserStatus = (userId: string, currentStatus: string) => {
    setStatus((prevState) => prevState + 1)
    currentStatus === 'active' ? setNewStatus('blocked') : setNewStatus('active');
    setUserId(userId)
    setOpen(true);
  };
  
  const positiveAction = () => {
    dispatch(updateUserStatus({ newStatus, userId }));
    setOpen(false);
  }
  
  const negativeAction = () => {
    setOpen(false);
  }

  return (
    <div className='pt-16'>
      {
        open &&
        <div className='absolute inset-0 bg-black/60 w-full h-full flex items-center z-10 justify-center'>
          <div className='flex flex-col gap-4 items-center align-middle bg-white w-1/3 p-6'>
            <h1 className='text-xl'> {newStatus === 'blocked' ? 'Are you sure you want to block this person?' : 'Are you sure you want to unblock this person?'}</h1>
            <div className='flex gap-6 text-2xl'>
            <button onClick={positiveAction} className='bg-green-600 px-3 py-2 rounded-md'>Yes 👍</button>
            <button onClick={negativeAction} className='bg-red-600 px-3 py-2 rounded-md'>No 👎</button>
            </div>
          </div>
        </div>
      }
      <h1 className='text-white text-3xl ms-14 text-center font-roboto font-bold mt-4'>USERS LIST</h1>
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
              {users?.map((row: any, index: number) => (
                <TableRow
                  key={index}
                  className={clsx(index % 2 === 0 ? '' : 'bg-violet-200', 'text-white')}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {Object.entries(row).filter(([key, value]) => key !== '_id').map(([key, value]: [string, any], subIndex: number) => (
                    <TableCell key={subIndex}>
                      {key !== 'status' && value} {/* Render other cell values */}
                      {key === 'status' && ( // Check if key is 'status'
                        value === 'active' ? ( // If status is 'active', render block button
                          <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-6 text-white p-3' onClick={() => toggleUserStatus(row._id, value)}>Block</button>
                        ) : ( // If status is 'blocked', render activate button
                          <button className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-md px-6 text-white p-3' onClick={() => toggleUserStatus(row._id, value)}>Activate</button>
                        )
                      )}
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
  );
};

export default AdminUsersList;
