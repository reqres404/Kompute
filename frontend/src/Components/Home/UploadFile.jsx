import { Box, Button, Input, Modal } from '@mui/material'
import React, { useEffect } from 'react'

const UploadFile = ({ selectedValue,setSelectedValue }) => {

  const [showModal, setShowmodal] = React.useState(false);

  useEffect(() => {
    if(selectedValue===10){
      setShowmodal(true)
    }

  }, [selectedValue])


  const handleClose = () => {
    setSelectedValue(1)
    setShowmodal(false)
  }



  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,width: 600, height: 350 }}>
        <h2 id="simple-modal-title">Upload csv file</h2>


      <Input type='file' inputProps={{accept:'.csv'}} sx={{mt:4}}/>
        <br/>
        <span id="simple-modal-description">
          Ensure the CSV file contains the application complexity, and R-Lane disposition
        </span>
        <br/>
        <span style={{mb:4}}>
          The System will not able to provide efforts without these details.
        </span>
        <Button variant="outlined" onClick={handleClose} sx={{my:2}}>
          Close Modal
        </Button>
      </Box>
    </Modal>
  )
}

export default UploadFile