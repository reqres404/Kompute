import {createSlice} from '@reduxjs/toolkit';


const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        isLoggedIn:false,
        reducer:{
            login:(state,action)=>{
                state.isLoggedIn=true;
                state.token=action.payload.token,
                state.user=action.payload
            },
            logout:(state)=>{
                state.isLoggedIn=false;
                state.user=null;
            }
        }
    }
})

export default userSlice.reducer;