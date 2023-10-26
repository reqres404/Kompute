import React, { useState } from 'react'
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DraftsIcon from '@mui/icons-material/Drafts';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../../Api/UserApi';
import { useNavigate } from 'react-router-dom';


const Login = () => {


  const [showPassword,SetShowPassword]=useState(false)
  const [userData,setUserData]=useState({email:"",password:""})
  const navigate=useNavigate();
 
  const handelUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }

  const handelLogin=async()=>{
    const response=await login(userData);
    console.log(response)

    if(response.status==200){
        navigate('/')
        
    }

  }




  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4.5,borderRadius:'15px',position:'relative',
        alignItems: 'center', width: '26vw', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.4)', px: 6, py: 2, height: '420px',color:'rgba(255, 255, 255, 0.5)'
      }}>
        

        <AccountCircleRoundedIcon sx={{fontSize:'100px',position:'absolute',top:-40,left:"35%"}} color='primary'  />

        
        <TextField
          type='text'
          variant='standard'
          fullWidth
          placeholder='Email'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DraftsIcon color='primary' /> {/* Icon goes here */}
              </InputAdornment>
            ),
          }}
          name="email"
          onChange={handelUserData}

        // sx={{
        //   boxShadow: '0px 0px 28px 7px rgba(255, 165, 0, 0.8)', // Apply the box shadow with high blur radius
        // }}
        />

        <TextField
          type={showPassword ? 'text':'password'}
          variant='standard'
          fullWidth
          name='password'
          placeholder='Password'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon color='primary' /> {/* Icon goes here */}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>SetShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityIcon color='primary'/>:<VisibilityOffIcon color='primary'/>}
                </IconButton>
              </InputAdornment>
            ),
          }}
         onChange={handelUserData}

        />

          <Button variant='contained' sx={{borderRadius:20,px:4}} onClick={handelLogin}>
            Log In
          </Button>

          <Typography component='span' fontSize='13px' sx={{p:0,m:0,color:'black'}}>Dont have account? Register</Typography>

      </Box>
    </Container>
  )
}

export default Login