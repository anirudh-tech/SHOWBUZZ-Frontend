import React from 'react'
import TableComponent from '../../components/Table/TableComponent'
import useFetchData from '../../hooks/FetchData';


const AdminUsersList = () => {
  const { data: users } = useFetchData('/movie/listUsers');
  const tableHead = ['Id', 'Customer name', 'Date Of joining', 'Streaming Time', 'Status'];
  const rows = [
    { name: 'Row 1', calories: 100, fat: 10, carbs: 20, protein: 5 },
    { name: 'Row 2', calories: 150, fat: 15, carbs: 25, protein: 8 },
    // Add more rows as needed
  ];
  return (
    <>
    <h1 className='text-white text-3xl ms-14  font-roboto font-bold mt-4'>USERS LIST</h1>
    <div className='w-full flex justify-center'>
      <TableComponent  data={rows} tableHead={tableHead}/>
    </div>
    </>
  )
}

export default AdminUsersList