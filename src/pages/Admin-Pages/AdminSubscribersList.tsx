import React from 'react'
import TableComponent from '../../components/Table/TableComponent';

const AdminSubscribersList = () => {
    const tableHead = ['Id', 'Customer name', 'Plan','Streaming Time', 'Next Due Date', 'Status'];
    const rows = [
      { name: 'Row 1', calories: 100, fat: 10, carbs: 20, protein: 5, carb: 20 },
      { name: 'Row 2', calories: 150, fat: 15, carbs: 25, protein: 8, carb: 20 },
    ];
    return (
      <>
      <h1 className='text-white text-3xl ms-14  font-roboto font-bold mt-4'>SUBSCRIBERS LIST</h1>
      <div className='w-full flex justify-center'>
        <TableComponent data={rows} tableHead={tableHead}/>
      </div>
      </>
    )
}

export default AdminSubscribersList