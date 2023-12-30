import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MyApp() {

  const navigate=useNavigate();

  const handelLogOut=()=>{
    navigate('/login')
    localStorage.clear()
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            KOMPUTE
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography sx={{ marginX: '16px' }}>Upload</Typography>
            <Typography sx={{ marginX: '16px' }} >Calculate</Typography>
            <IconButton 
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',  // Set the background to transparent on hover
              },
            }}
             onClick={handelLogOut}>
              <PowerSettingsNewIcon fontSize='small'  sx={{ '&:hover': { color: 'red' }, color:'white',marginX: '16px' }} />
            </IconButton>
           
          </div>

        </Toolbar>

      </AppBar>
      {/* Your application content goes here */}
    </div>
  );
}

export default MyApp;
