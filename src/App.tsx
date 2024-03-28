import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import UserSignup from "./pages/User-Pages/UserSignup"
import { useDispatch, useSelector } from "react-redux";
import { IAdminSelector, IUserSelector } from "./interface/IUserSlice";
import { makeErrorDisable } from './redux/reducers/user/userSlice';
import { Toaster } from "react-hot-toast";
// import TheatreSignup from "./pages/Theatre-Pages/TheatreSignup";
import Navbar from "./components/navbar/Navbar";
import UserHome from "./pages/User-Pages/UserHome";
import { useEffect } from "react";
import { AppDispatch } from "./redux/store";
import { fetchUser } from "./redux/actions/userActions";
import TheatreHome from "./pages/Theatre-Pages/TheatreHome";
import NotFound from "./pages/NotFound";
import UserSettings from "./pages/User-Pages/UserSettings";
import TheatreProtectedRoute from "./components/ProtectedRoutes/TheatreProtectedRoute";
import TheatreSettings from "./pages/Theatre-Pages/TheatreSettings";
import TheatreSignup from "./pages/Theatre-Pages/TheatreSignup";
import AdminDashboard from "./pages/Admin-Pages/AdminDashboard";
import AdminUsersList from "./pages/Admin-Pages/AdminUsersList";
import AdminSubscribersList from "./pages/Admin-Pages/AdminSubscribersList";
import AdminTheatresList from "./pages/Admin-Pages/AdminTheatresList";
import AdminTheatreMovies from "./pages/Admin-Pages/AdminTheatreMovies";
import AdminAddMovies from "./pages/Admin-Pages/AdminAddMovies";
import UserTheatreMovies from "./pages/User-Pages/UserTheatreMovies";
import AdminSettings from "./pages/Admin-Pages/AdminSettings";
import UserTicketBooking from "./pages/User-Pages/UserTicketBooking";
import TheatreMovies from "./pages/Theatre-Pages/TheatreMovies";
import TheatreSelectMovies from "./pages/Theatre-Pages/TheatreSelectMovies";
import { listTheatre } from "./redux/actions/adminActions";



function App() {
  const { user, error, } = useSelector((state: IUserSelector) => state.user);
  const role = useSelector((state: IUserSelector) => state.user?.user?.role);
  const dispatch = useDispatch<AppDispatch>();
  console.log('user === > ', user, role)
  const id = useSelector((state: IUserSelector) => state.user?.user?._id);
  console.log(id,'id from app tsx')
  const admin: any = useSelector((state: IAdminSelector) => state.admin);
  console.log(admin,'screens--==')
  
  useEffect(() => {
    dispatch(listTheatre(id))
    dispatch(fetchUser());
  }, [id]);

  useEffect(() => {

    if (error) {
      setTimeout(() => {
        dispatch(makeErrorDisable());
      }, 5000);
    }
  }, [error]);

  if (user === null || role == undefined) {
    // User is not authenticated
    return (
      <>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/theatre/signup" element={<TheatreSignup />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </>
    );
  }

  if (user?.role === 'user') {
    return (
      <>
        <Toaster position="top-center" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/userHome" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={'/userHome'} />} />
          <Route path='/userHome' element={user ? <UserHome /> : <Navigate to={'/login'} />} />
          <Route path='/userTheatreMovies' element={user ? <UserTheatreMovies /> : <Navigate to={'/login'} />} />
          <Route path='/selectTheatre/:id' element={user ? <UserTicketBooking /> : <Navigate to={'/login'} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </>
    );
  }

  if (user?.role === 'theatre') {

    return (
      <>
        <Toaster position="top-center" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/theatre/dashboard" />} />
          <Route path="/theatre/signup" element={<Navigate to="/theatre/dashboard" />} />
          <Route path="/login" element={<Navigate to="/theatre/dashboard" />} />
          <Route path='/theatre/dashboard' element={user ? <TheatreHome /> : <Navigate to={'/'} />} />
          <Route path="/theatre/settings" element={<TheatreProtectedRoute element={<TheatreSettings />} />} />
          <Route path="/theatre/movies" element={<TheatreProtectedRoute element={<TheatreMovies />} />} />
          <Route path="/theatre/selectMovies" element={<TheatreProtectedRoute element={<TheatreSelectMovies />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }

  if (user?.role === 'admin') {
    return (
      <>
        <Toaster position="top-center" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/login" element={<Navigate to="/admin/dashboard" />} />
          <Route path='/admin/dashboard' element={user ? <AdminDashboard /> : <Navigate to={'/'} />} />
          <Route path="/admin/users-list" element={user ? <AdminUsersList /> : <Navigate to={'/'} />} />
          <Route path="/admin/subscribers-list" element={user ? <AdminSubscribersList /> : <Navigate to={'/'} />} />
          <Route path="/admin/theatres-list" element={user ? <AdminTheatresList /> : <Navigate to={'/'} />} />
          <Route path="/admin/theatre-movies" element={user ? <AdminTheatreMovies /> : <Navigate to={'/'} />} />
          <Route path="/admin/addMovies" element={user ? <AdminAddMovies /> : <Navigate to={'/'} />} />
          <Route path="/admin/settings" element={user ? <AdminSettings /> : <Navigate to={'/'} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    )
  }

}

export default App
