/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import clsx from 'clsx';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { handleApproval } from '../../redux/actions/adminActions';
import fetchData from '../../utils/fetchData';

const ApproveRequests = ({setApprovalModal}: any) => {
  const tableHead = ['Theatre name', 'email', 'Status'];
  const [activePage, setActivePage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const [approvals, setApprovals] = useState<any>([]);


  const toggleUserStatus = async (id: string, status: string) => {
    await dispatch(handleApproval({ id, status }));
    setApprovals((prevApprovals: any) => prevApprovals.filter((approval: any) => approval._id !== id));
  };

  useEffect(() => {
    const fetchingData = async () => {
      const approvals = await fetchData('/theatre/listApprovalRequests');
      setApprovals(approvals.data);
    };
    console.log("effect");
    fetchingData();
  }, [dispatch]);

  return (
    <div className="">
      <h1 className='text-white text-3xl ms-14  text-center font-bold mt-4'>APPROVAL REQUESTS</h1>
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
              {approvals?.map((row: any, index: number) => (
                <>
                {
                  row.status === 'pending' ? (
                    <>
                      <TableRow
                        key={index}
                        className={clsx(index % 2 === 0 ? '' : 'bg-violet-200', 'text-white')}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        {Object.entries(row).filter(([key]) => key !== '_id').map(([key, value]: [string, any], subIndex: number) => (
                          <TableCell key={subIndex}>
                            {key !== 'status' && value}
                            {key === 'status' && (
                              value === 'pending' ? (
                                <div>
                                  <IconButton onClick={() => toggleUserStatus(row._id, 'approved')} color="success">
                                    <CheckCircle />
                                  </IconButton>
                                  <IconButton onClick={() => toggleUserStatus(row._id, 'declined')} color="error">
                                    <Cancel />
                                  </IconButton>
                                </div>
                              ) : (
                                // Render a message or different icon if status is not 'pending'
                                <div>{value}</div>
                              )
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </>
                  ) : (
                    ""
                  )
                }
                </>
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

export default ApproveRequests;
