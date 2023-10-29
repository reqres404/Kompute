import axios from 'axios'



// http://localhost:4000/api/user/register


export const register= async (data)=>{

  
    try{
    let response= await axios.post('api/user/register',data)
    alert(response.message) 
    console.log(response) 
       return response;
    }
    catch(error){
        alert(error.response.data.message)
        console.log(error)
    }
} 


export const login =async (data)=>{
  
    

    try {
        let response=await axios.post('api/user/login',data)
        console.log(response);
        // if(response.status==200){
        // localStorage.setItem('token',response.data.token)
        // localStorage.setItem('role',response.data.user.role)
        // localStorage.setItem('_id',response.data.user._id)
        // }
        // return response;
    } catch (error) {
        console.log(error.response.data)
        // alert(error.response.data)
        
    }

}