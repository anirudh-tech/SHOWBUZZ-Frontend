import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHeart } from 'react-icons/ai'
import { BiHistory, BiUser } from 'react-icons/bi'
import { FiSettings } from 'react-icons/fi'
import { GiMailbox } from 'react-icons/gi'
import { RiDashboardLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { SiCashapp } from 'react-icons/si'
import { IoIosPeople } from 'react-icons/io'
import { FaTicketAlt } from 'react-icons/fa'
import { IUserSelector } from '../../interface/IUserSlice'
interface AdditionalProps {
  onClick?: () => void;
}
function SideBar(props: React.ComponentProps<typeof NavLink> | AdditionalProps) {
  const role = useSelector((state: IUserSelector) => state.user?.user?.role);

  const columns = (role === 'user') ? [
    { to: '/userHome', icon: <RiDashboardLine />, name: 'Home' },
    { to: '/userTheatreMovies', icon: <FaTicketAlt />, name: 'Ticket Booking' },
    { to: '/community', icon: <IoIosPeople />, name: 'Community' },
    { to: '/subscription', icon: <SiCashapp />, name: 'Subscription' },
    { to: '/my-tickets', icon: <GiMailbox />, name: 'My Tickets' },
    { to: '/favorites', icon: <AiOutlineHeart />, name: 'Favorites' },
    { to: '/settings', icon: <FiSettings />, name: 'Settings' },
  ] : (role === 'theatre') ? [
    { to: '/theatre/dashboard', icon: <RiDashboardLine />, name: 'Dashboard' },
    { to: '/theatre/movies', icon: <BiUser />, name: 'Movies' },
    { to: '/theatre/show-bookings', icon: <BiHistory />, name: 'Show Bookings' },
    { to: '/theatre/bookings-list', icon: <AiOutlineHeart />, name: 'List Of Bookings' },
    { to: '/theatre/settings', icon: <FiSettings />, name: 'Settings' },
  ] : (role === 'admin') ? [
    { to: '/admin/dashboard', icon: <RiDashboardLine />, name: 'Dashboard' },
    { to: '/admin/theatre-movies', icon: <BiUser />, name: 'Theatre Movies' },
    { to: '/admin/stream-movies', icon: <BiHistory />, name: 'Stream Movies ' },
    { to: '/admin/users-list', icon: <FiSettings />, name: 'Users List' },
    { to: '/admin/subscribers-list', icon: <FiSettings />, name: 'Subscribers List' },
    { to: '/admin/theatres-list', icon: <FiSettings />, name: 'Theatres List'},
    { to: '/admin/ticket-booking-list', icon: <FiSettings />, name: 'Tickets Booking List'},
    { to: '/admin/settings', icon: <FiSettings />, name: 'Settings'},
  ] : []
  return (
    <div className="w-full bg-black fixed bg-opacity-80 text-white shrink-0 rounded hidden lg:block  h-screen z-10" >
      <div className='w-1/6 h-screen bg-gray-900 pt-16'>
        {
          columns.map((column) =>
            <NavLink className="side-nav-link-sp" to={column.to}
              {...props} >
              {column.icon}
              {column.name}
            </NavLink>)
        }
      </div>
    </div>
  )
}


export default SideBar