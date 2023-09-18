import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from "@mui/material";

const DisplayTable = ({ selectedValue }) => {

    console.log(selectedValue)


    const [edit, setEdit] = useState(true)

    const [data, setData] = useState([
        { row: 'COTS Rehost', username: 20, password: 44, email: 21 },
        { row: 'COTS Replatform', username: 40, password:34, email: 23 },
        { row: 'Bespoke Replatform', username: 50, password: 56, email: 30 },
        { row: 'Bespoke Refactor', username: 25, password: 67, email: 43 }
    ]);

    const handleCellEdit = (rowIndex, colName, value) => {

        const newData = [...data];
        newData[rowIndex][colName] = value;
        setData(newData);
        
    };

    const handelSave=()=>{
        console.log(data)
    }


    useEffect(() => {
        
        if (selectedValue == 20) {
            setEdit(false);
        }else{
            setEdit(true)
        }
    }, [selectedValue])


    return (
        <Paper elevation={21} sx={{marginX:23,padding:5}}>
         {!edit && <Typography sx={{fontSize:'15px',color:'green'}} >Edit now</Typography>}
            <TableContainer  >
                <Table sx={{minWidth:'700px'}} aria-label="simple table">
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
                            data.map((curUser, rowIndex) => {
                                const { row, username, email } = curUser;
                                const { password } = curUser;

                                return (

                                    <TableRow
                                        key={row}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{fontWeight:600}} >
                                            {row}
                                        </TableCell>
                                        
                                        <TableCell >
                                            <input
                                               type='number'
                                                value={username}
                                                style={{textAlign:'center',border:'none',outline: 'none',appearance: 'textfield' }}
                                                onChange={(e) => handleCellEdit(rowIndex, 'username', e.target.value)}
                                                disabled={edit}
                                                /> 
                                            
                                        </TableCell>
                                        <TableCell >
                                        <input
                                                type='number'
                                                value={password}
                                                style={{textAlign:'center',border:'none',outline: 'none',appearance: 'textfield'}}
                                                onChange={(e) => handleCellEdit(rowIndex, 'password', e.target.value)}
                                                disabled={edit}
                                                
                                            />
                                          
                                        </TableCell>
                                        <TableCell >
                                        <input  
                                                type='number'
                                                value={email}
                                                style={{textAlign:'center',border:'none',outline: 'none',appearance: 'textfield'}}
                                                onChange={(e) => handleCellEdit(rowIndex, 'email', e.target.value)}
                                                disabled={edit}
                                            />
                                        
                                        </TableCell>
                                        
                                    </TableRow>
                                )
                            })

                        }
                    </TableBody>
                </Table>
                <Button variant='contained' color="primary" onClick={()=>handelSave()}>Save</Button>
            </TableContainer>
        </Paper>
    )
}
export default DisplayTable;






