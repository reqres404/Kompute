import React, { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './Theme'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoutes';


import Home from './Components/Home/Home';
import Calculate from './Components/Kompute/Calculate';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import Nav from './Components/Nav'




function App() {




  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Nav /> */}
        <Routes >
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/calculate" element={<Calculate />} />
          </Route>

          <Route path="/*" element={<Navigate to="/" />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>


      </ThemeProvider>
    </Router>
  );
}

export default App;
