import React from 'react'
import {  Outlet,useNavigate } from 'react-router-dom';
import Navbar from "./Nav"
const ProtectedRoute = () => {
    const navigate=useNavigate()
    const auth=localStorage.getItem('token')

   

    React.useEffect(() => {
        if (!auth) {
          navigate('/register', { replace: true });
        }
      }, [auth, navigate]);


  return auth ? (<>
   {
  /* Conditionally render Navbar based on the showNav prop */}
  <Outlet />
</>
) : null;
  
}

export default ProtectedRoute