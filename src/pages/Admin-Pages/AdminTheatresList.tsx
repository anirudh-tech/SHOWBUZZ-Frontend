import React from 'react'
import TableComponent from '../../components/Table/TableComponent';
import useFetchData from '../../hooks/FetchData';
import { ITheatre } from '../../interface/ITheatreMovie';

const AdminTheatresList = () => {
    const { data: theatres } = useFetchData(`/theatre/listTheatres`);
    const filteredTheatresData = theatres?.map((theatre: ITheatre) => ({
      id: theatre._id,
      name: theatre.username,
      totalAmountPaid: theatre.totalAmountPaid,
      dateOfJoining: theatre.createdAt
  }));

  console.log(filteredTheatresData,'filteredTheatresData====');
  
    const tableHead = ['Id', 'Theatre name', 'Total Amount Paid', 'Date Of Joining'];
    return (
      <>
      <h1 className='text-white text-3xl ms-14  font-roboto font-bold mt-4'>THEATRES LIST</h1>
      <div className='w-full flex justify-center'>
        <TableComponent data={filteredTheatresData} tableHead={tableHead}/>
      </div>
      </>
    )
}

export default AdminTheatresList