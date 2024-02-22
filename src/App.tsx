import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import UserSignup from "./pages/UserSignup"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<UserSignup />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
