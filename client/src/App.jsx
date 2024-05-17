import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Login from './Pages/Auth/Login/Login'
import Register from './Pages/Auth/Register/Register'
import Dashboard from './Pages/Admin/Dashboard'
import Hero from './Pages/Hero/Hero'
import Services from './Pages/Services/Services'
import CreateService from './Pages/Services/CreateService' 
import Unauthorized from './Pages/Unauthorized/Unauthorized'
import { jwtDecode } from 'jwt-decode'
import AddAdmin from './Pages/Admin/AddAdmin'
import AddUser from './Pages/User/AddUser'
import UpdateUser from './Pages/User/UpdateUser'
import UpdateAdmin from './Pages/Admin/UpdateAdmin'
import UpdateService from './Pages/Services/UpdateService'
import UserDetails from './Pages/User/UserDetails'
import FAQs from './Pages/FAQs/FAQs'
import Feedbacks from './Pages/Feedbacks/Feedbacks'
import CreateFeedback from './Pages/Feedbacks/CreateFeedback'

const App = () => {
  const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
  let userData = {};

  if (token && typeof token === 'string') {
    try {
      userData = jwtDecode(token); // Decode only if token is a string
      // Use userData here
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle decoding error (e.g., invalid token format)
    }
  } else {
    console.warn('No token found or invalid token type');
    // Handle the case where there's no token or it's not a string
  }
  
  return (
    <>
      <Routes>
        <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/' Component={Hero}/>
        <Route path='/dashboard' Component={userData.role === "admin" ? Dashboard : Unauthorized}/>
        <Route path='/services' Component={Services}/>
        <Route path='/dashboard/addService' Component={CreateService}/>
        <Route path='/dashboard/:id/updateService' Component={UpdateService}/>
        <Route path='/dashboard/addAdmin' Component={AddAdmin}/>
        <Route path='/dashboard/updateAdmin/:id' Component={UpdateAdmin}/>
        <Route path='/dashboard/addUser' Component={AddUser}/>
        <Route path='/dashboard/updateUser/:id' Component={UpdateUser}/>
        <Route path='/userDetails' Component={UserDetails}/>
        <Route path='/faqs' Component={FAQs}/>
        <Route path='/feedbacks' Component={Feedbacks}/>
        <Route path='/addFeedback' Component={CreateFeedback}/>
      </Routes>
    </>
  )
}


export default App