import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   res: [] ,

};

const resSlice = createSlice({
   name: "res",
   initialState,
   reducers: {
      getResponse : async(state , action)=>{
         state.res =action.payload
     }

   }
});

export const resReducer = resSlice.reducer;
export const resAction = resSlice.actions;
