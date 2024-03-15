import React from 'react'
import TableComponent from '../../components/Table/TableComponent';

const AdminTheatresList = () => {
    const tableHead = ['Id', 'Theatre name', 'Total Amount Paid', 'Date Of Joining'];
    const rows = [
      { name: 'Row 1', calories: 100, fat: 10, carbs: 20},
      { name: 'Row 2', calories: 150, fat: 15, carbs: 25},
      // Add more rows as needed
    ];
    return (
      <>
      <h1 className='text-white text-3xl ms-14  font-roboto font-bold mt-4'>THEATRES LIST</h1>
      <div className='w-full flex justify-center'>
        <TableComponent data={rows} tableHead={tableHead}/>
      </div>
      </>
    )
}

export default AdminTheatresList