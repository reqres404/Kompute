import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './Theme'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import DisplayTable from './Components/Table';
import Home from './Components/Home/Home';
import Calculate from './Components/Kompute/Calculate';



function App() {
      return (
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/calculate" element={<Calculate/>} />
              </Routes>
                        
          </ThemeProvider>
       </Router>
      );
}

export default App;
