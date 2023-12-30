import { Box, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DisplayTable from '../Table';
import UploadFile from './UploadFile';
import Navbar from "../Nav"

const Home = () => {
    const [selectedValue, setSelectedValue] = useState(1);
    const [customerName,setCustomerName]=useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    
    return (
        <Box >
            
          <Navbar/>
            <Container sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 5,alignItems:'center' }}>

                {/* <Typography variant='h1' sx={{ fontWeight: 900 }}>Welcome to Kompute, An estimation framework powered by CME-CLOUD</Typography> */}
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center',gap:4}}>
                    <TextField label="Enter Customer Name" style={{ width: '33vw' }} InputProps={{
                    style: {
                        //   height:'48px',
                        //   padding: '0px 0px', // Adjust padding as needed
                        borderRadius: '2px',
                        borderWidth: '2px'
                        },
            
                    }}  onChange={(e)=>{setCustomerName(e.target.value)}} />

                    <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                    <FormControl sx={{ minWidth: 200, display: 'flex'}}>
                        <Select
                            value={selectedValue}
                            onChange={handleChange}
                        >
                            <MenuItem value={1}>
                            Choose option to Enter Data
                            </MenuItem>
                            <MenuItem value={10}>Upload File</MenuItem>
                            <MenuItem value={20}>Enter Data Manually</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            <DisplayTable selectedValue={selectedValue} />
            </Container>
            <UploadFile selectedValue={selectedValue} setSelectedValue={setSelectedValue} customerName={customerName}/>
        </Box>
    )
}

export default Home