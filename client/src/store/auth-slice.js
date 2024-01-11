import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from 'jwt-decode'
const getRole=()=>{
    const token=JSON.parse(localStorage.getItem('role'))
    if(!token){
        return ""
    }
    const decoded=jwtDecode(token)
    
    return decoded.role
}
const initialAuthState={
    role:"" || getRole(),
    token:localStorage.getItem('role')|| null
}

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            const data=action.payload
            state.role=data.role
            state.token=localStorage.setItem('role',JSON.stringify(data.roleToken))
        },
        logout(state){
            state.role=""
            state.token=null
        },
        
    }
})

export const authActions=authSlice.actions;
export default authSlice;

