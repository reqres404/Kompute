import axios from 'axios'

const baseUrl='/user/'

// http://localhost:4000/api/user/register


export const register= async (data)=>{

  
    try{
    let response= await axios.post('api/user/register',data)
    alert(data.message) 
    console.log(response) 
       return response=response.json();


    }
    catch(error){
        alert(error.response.data.message)
        console.log(error)
    }
} 


export const login =async (data)=>{
    console.log(data)

    try {
        let response=await axios.post('api/user/login',data)
        if(response.status==200){
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('role',response.data.role)
        }console.log(response)
    } catch (error) {
        console.log(error.response.data)
        alert(error.response.data)
        
    }

}