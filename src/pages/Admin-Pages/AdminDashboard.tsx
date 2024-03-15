import React from 'react'
import totalUsers from '../../assets/Total Users.svg'
import totalOrders from '../../assets/Total Order.svg'
import totalSales from '../../assets/Total Sales.svg'
import card from '../../assets/card.svg'

function AdminDashboard() {
    return (
        <>
            <div className="">
                <div className='flex justify-evenly pt-20'>
                    <img className='' src={totalUsers} alt="" />
                    <img className='' src={totalOrders} alt="" />
                    <img src={totalSales} alt="" />
                </div>
                <div className='flex justify-evenly pt-4' >
                    <img className='w-2/4' src={card} alt="" />
                </div>
            </div>
        </>
    )
}

export default AdminDashboard