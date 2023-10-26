import axios from 'axios'



export const getData= async (data)=>{
    const id=localStorage.getItem("_id")
  
    try{
    let response= await axios.post('api/upload/retrieveSheetData',{user_id:id})
    
    console.log(response.data)
    return response=response.data;
    }
    catch(error){
        alert(error.response.data.message)
        console.log(error)
    }
}

export const uploadData= async (formData)=>{
  console.log(formData)
    try{
    let response= await axios.post('api/upload/sheet', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    
    console.log(response)
    return response=response.data;
    }
    catch(error){
        alert(error.response.data.message)
        console.log(error)
    }
}