import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import UserSignup from "./pages/UserSignup"
import { useDispatch, useSelector } from "react-redux";
import { IUserSelector } from "./interface/IUserSlice";
import UserProtectedRoute from "./components/ProtectedRoutes/UserProtectedRoute";
import { makeErrorDisable } from './redux/reducers/user/userSlice';
import { Toaster } from "react-hot-toast";
import TheatreSignup from "./pages/TheatreSignup";
import Navbar from "./components/navbar/Navbar";
import UserHome from "./pages/UserHome";
import { useEffect } from "react";
import { AppDispatch } from "./redux/store";
import { fetchUser } from "./redux/actions/userActions";


function App() {
  const { user, error, } = useSelector((state: IUserSelector) => state.user);
  const role = useSelector((state: IUserSelector) => state.user?.user?.role);
  const dispatch = useDispatch<AppDispatch>();
  console.log('user === > ', user, role)

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {

    if (error) {
      setTimeout(() => {
        dispatch(makeErrorDisable());
      }, 5000);
    }
  }, [error, dispatch]);

  if (user === null) {
    // User is not authenticated
    return (
      <>
        <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/theatre/signup" element={<TheatreSignup />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
      </>
    );
  }

  if (user?.role === 'user') {
    // User is authenticated and has a 'user' role
    return (
      <>
      <Toaster position="top-center" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/userHome" />} />
          <Route path='/userHome' element={user ? <UserHome /> : <Navigate to={'/login'} />} />
          {/* Add your user-specific routes here */}
          <Route path="*" element={<Navigate to={"/userHome"} />} />
        </Routes>
      </>
    );
  }

  if (user?.role === 'theatre') {
    // User is authenticated and has a 'theatre' role
    return (
      <>
      <Toaster position="top-center" />
      <Routes>
      <Route path="/" element={<Navigate to="/theatreHome" />} />
        {/* Add your theatre-specific routes here */}
        <Route path="*" element={<Navigate to={"/theatreHome"} />} />

      </Routes>
      </>
    );
  }


  return (
      <Navigate to="/login" />
    ) 
    
  // return (
  //   <>
  //   {user ? user?.role === "user" && <Navbar /> : ""}
  //     <Routes>
  //       <Route path="/login" element={(!user && !role) ? <Login /> : <Navigate to={"/"} />} />
  //       <Route path="/signup" element={(!user && !role) ? <UserSignup /> : <Navigate to={"/"} />} />
  //       <Route path="/theatre/signup" element={(user && role !== undefined) ? <Navigate to={"/"} /> : <TheatreSignup />} />
  //     {user !== null && user?.role && (
  //       <>
  //       <Route path='/' element={<>{user?.role === 'admin' ? <Navigate to={'/admin/dashboard'} /> : user?.role === "theatre" ? <Navigate to={'/theatre/home'} /> : <UserHome/>}</>} />
  //       </>
  //     )}
  //         <Route path='/' element= {<Navigate to="/login" />}/>
  //         <Route path="/theatre/signup" element={(user && role !== undefined) ? <Navigate to={"/"} /> : <TheatreSignup />} />
  //       <Route path='/userHome' element={<>{UserProtectedRoute({ element: <UserHome /> })}</>} />
  //     </Routes>
  //   </>
  // )
}

export default App
