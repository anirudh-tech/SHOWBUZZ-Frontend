import React from 'react'
import TableComponent from '../../components/Table/TableComponent'
import useFetchData from '../../hooks/FetchData';


const AdminUsersList = () => {
  const { data: users } = useFetchData('/movie/listUsers');
  const tableHead = ['Id', 'Customer name', 'Date Of joining', 'Streaming Time', 'Status'];
  return (
    <>
    <h1 className='text-white text-3xl ms-14  font-roboto font-bold mt-4'>USERS LIST</h1>
    <div className='w-full flex justify-center'>
      <TableComponent  data={users} tableHead={tableHead}/>
    </div>
    </>
  )
}

export default AdminUsersList