import React, { useState } from 'react'
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DraftsIcon from '@mui/icons-material/Drafts';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { register } from '../../Api/UserApi';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const navigate=useNavigate();
  const [showPassword,SetShowPassword]=useState(false)
  const [userData,setUserData]=useState({email:"",password:"",username:""})

  const handelUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }

  const handelSubmit=async()=>{
    try{
    const response=await register(userData);
    if(response.status==201){
      navigate('/login')
    }
  }catch(e){
    alert(e.response.data.message)
  }
    


  }


  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4.5,borderRadius:'15px',
        alignItems: 'center', width: '28vw', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.5)', px: 8, py: 2, height: 'auto'
      }}>

        <Typography variant='h1' >Register</Typography>

        <TextField
          type='text'
          variant='standard'
          fullWidth
          placeholder='Name'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon color='primary' /> {/* Icon goes here */}
              </InputAdornment>
            ),
          }}
          name='username'
          onChange={handelUserData}

        />
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
          name='email'
          onChange={handelUserData}

        // sx={{
        //   boxShadow: '0px 0px 28px 7px rgba(255, 165, 0, 0.8)', // Apply the box shadow with high blur radius
        // }}
        />

        <TextField
          type={showPassword ? 'text':'password'}
          variant='standard'
          fullWidth
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

          name='password'
          onChange={handelUserData}
        />

          <Button variant='contained' sx={{borderRadius:20,px:4}} onClick={handelSubmit}>
            Create Account
          </Button>

          <Typography component='span' fontSize='13px' sx={{p:0,m:0}}>Already have account? Sign In</Typography>

      </Box>
    </Container>
  )
}

export default Register