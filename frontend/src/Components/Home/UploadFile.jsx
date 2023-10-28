import { Box, Button, Input, Modal } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { uploadData } from '../../Api/SheetData';

const UploadFile = ({ selectedValue,setSelectedValue,customerName }) => {

  const [showModal, setShowmodal] = React.useState(false);
  const id =localStorage.getItem('_id');

  // console.log(id)

  useEffect(() => {
    if(selectedValue===10){
      setShowmodal(true)
    }

  }, [selectedValue])


  const handleClose = () => {
    setSelectedValue(1)
    setShowmodal(false)
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  
  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('user_id',id)
      formData.append('customerName',customerName)
      if(customerName!='')
      localStorage.setItem('customerName',customerName);

      console.log(customerName)
      const response=await uploadData(formData)
      alert(response.message)
      console.log('File uploaded successfully:', response.message);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,width: 600, height: 350 }}>
        <h2 id="simple-modal-title">Upload csv file</h2>


      <Input type='file' inputProps={{accept:'.xlsx'}} sx={{mt:4}} onChange={handleFileChange}/>
      <Button onClick={handleFileUpload}>Upload</Button>
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