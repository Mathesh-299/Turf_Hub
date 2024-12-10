import { createSlice } from "@reduxjs/toolkit";

const Slice= createSlice({
    name:"admin",
    initialState: {
        admin:'hi'
    },
    reducers: {
       log:(state,action)=>{
        state.admin=action.payload.admin;
       }
    }
       
})

export const { log } =Slice.actions
export const selectuser=(state)=>state.admin.admin
export default Slice.reducer