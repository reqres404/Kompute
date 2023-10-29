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
import { getMasterData } from "../Api/MasterData";

const Efforts = ({ selectedValue }) => {

    


    const [edit, setEdit] = useState(true)

    const [data, setData] = useState([]);
    const [masterdata, setMasterData] = useState([]);
    const [efforts,setEfforts]=useState([]);

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

   
      
      const handelCalculateEfforts=async ()=>{
            const SheetData = await getData(localStorage.getItem("_id"));
            // const MasterData=await getMasterData();

            
            setMasterData(SheetData[0].userBaseline)
            setData(SheetData[0].uploadData)
            // console.log(data);
            // console.log(masterdata);

            let multipliedArray = [];

            for (let i = 0; i < masterdata.length; i++) {
                 let multipliedObject = {};
                for (let key in masterdata[i]) {
                    if (key !== 'ApplicationTreatment' && key !== '_id') {
                     multipliedObject[key] = masterdata[i][key] * data[i][key];
                    } else {
                    multipliedObject[key] = masterdata[i][key];
                 }
                }
                multipliedArray.push(multipliedObject);
                }

                setEfforts(multipliedArray);
                console.log(efforts)
        }


    return (
        <Paper elevation={21} sx={{marginX:30,padding:5}}>
        <Button variant='contained' color="primary" onClick={()=>handelCalculateEfforts()} sx={{mx:2}}> Calculate Efforts</Button>
            
         {!edit && <Typography sx={{fontSize:'15px',color:'green'}} >Edit now</Typography>}
         {efforts.length > 0 &&
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
                           efforts.length > 0 && efforts.map((curUser, rowIndex) => {
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
            </TableContainer>}
        </Paper>
    )
}
export default Efforts;






