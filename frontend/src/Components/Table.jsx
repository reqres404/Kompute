import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from "@mui/material";
import { getData } from "../Api/SheetData";
import axios from "axios";

const DisplayTable = ({ selectedValue }) => {

    const user_id=localStorage.getItem('_id')


    const [edit, setEdit] = useState(true)

    const [data, setData] = useState([]);

    const handleCellEdit = (rowIndex, colName, value) => {

        const newData = [...data];
        newData[rowIndex][colName] = value;
        setData(newData);
        
    };

    const handelSave=async ()=>{
        console.log(data)
        let response = await axios.put('api/upload/modifySheetData',{updatedSheetData:data,user_id:user_id});
        console.log(response)
        setData(response.data.updatedDocument.uploadData)
        
    }


    useEffect(() => {
        
        if (selectedValue == 20) {
            setEdit(false);
        }else{
            setEdit(true)
        }
    }, [selectedValue])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const ans = await getData(localStorage.getItem("_id"));
            setData(ans[0].uploadData)
            // console.log(ans[0].uploadData)
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, []);
      


    return (
        <Paper elevation={21} sx={{padding:3,mt:3,maxWidth:'800px',borderRadius:'15px'}}>
            
         {!edit && <Typography sx={{fontSize:'15px',color:'green'}} >Edit now</Typography>}
         {data.length > 0 &&
            <TableContainer  >
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell sx={{fontWeight:600}}>Application Treatment</TableCell>
                            <TableCell align="center" sx={{fontWeight:600}}>Simple</TableCell>
                            <TableCell align="center" sx={{fontWeight:600}}>Medium</TableCell>
                            <TableCell align="center" sx={{fontWeight:600}}>Complex</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                           data.length > 0 && data.map((curUser, rowIndex) => {
                               const { ApplicationTreatment, Simple, Medium } = curUser;
                               const { Complex } = curUser;
                            //    console.log(Simple)

                                return (

                                    <TableRow
                                        key={rowIndex}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{fontWeight:600}} >
                                            {ApplicationTreatment}
                                        </TableCell>
                                        
                                        <TableCell >
                                            <input
                                               type='number'
                                                value={Simple}
                                                style={{textAlign:'center',border:'none',outline: 'none',appearance: 'textfield' }}
                                                onChange={(e) => handleCellEdit(rowIndex, 'Simple', e.target.value)}
                                                disabled={edit}
                                                /> 
                                            
                                        </TableCell>
                                        <TableCell >
                                        <input
                                                type='number'
                                                value={Medium}
                                                style={{textAlign:'center',border:'none',outline: 'none',appearance: 'textfield'}}
                                                onChange={(e) => handleCellEdit(rowIndex, 'Medium', e.target.value)}
                                                disabled={edit}
                                                
                                            />
                                          
                                        </TableCell>
                                        <TableCell >
                                        <input  
                                                type='number'
                                                value={Complex}
                                                style={{textAlign:'center',border:'none',outline: 'none',appearance: 'textfield'}}
                                                onChange={(e) => handleCellEdit(rowIndex, 'Complex', e.target.value)}
                                                disabled={edit}
                                            />
                                        
                                        </TableCell>
                                        
                                    </TableRow>
                                )
                            })

                        }
                    </TableBody>
                </Table>
                <Button variant='contained' color="primary" sx={{borderRadius:"12px"}} onClick={()=>handelSave()}>Save</Button>
            </TableContainer>}
        </Paper>
    )
}
export default DisplayTable;






