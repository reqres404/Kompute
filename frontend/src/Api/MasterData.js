import axios from "axios"

export const getData= async (data)=>{
    const id=localStorage.getItem("_id")
  
    try{
    let response= await axios.post('api/upload/retrieveSheetData',{user_id:id})
    
    console.log(response.data)
    // return response=response.data;
    }
    catch(error){
        alert(error.response.data.message)
        console.log(error)
    }
}
export const getMasterData= async (data)=>{
    const id=localStorage.getItem("_id")
  
    try{
    let response= await axios.post('/api/upload/retrieveMasterData',{
        "dataName":"master"
      })
    
    // console.log(response)
    return response=response;
    }
    catch(error){
        alert(error.response.data.message)
        console.log(error)
    }
}


export const modifyBaseline=async (data)=>{
    const user_id=localStorage.getItem("_id");
    try{
        let response=await axios.put("/api/upload/modifyBaseline",{user_id,updatedBaseline:data})
        console.log(response);

    }catch(error){
        console.log(error)
    }
}