import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
interface IProps {
    data: any,
    tableHead: any
}

const TableComponent = ({ data, tableHead }: IProps) => {
    return (
        <TableContainer className='mt-4 m-14 ' component={Paper}>
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
                    {data.map((row: { name: string, calories: number, fat: number, carbs: number, protein: number }
                        , index: number) => (
                        <TableRow
                            key={row.name}
                            className={clsx(index % 2 === 0 ? '' : 'bg-violet-200', 'text-white')}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.values(row).map((value, subIndex) => (
                                <TableCell  key={subIndex}>
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent