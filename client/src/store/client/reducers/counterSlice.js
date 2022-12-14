import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   count: 0,
};

const countSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      increase: (state, action) => {
         state.count += 1; //mutable , immer --syntax suger
      },
      decrease: (state, action) => {
         state.count -= 1;
      },
   },
});

export const counterReducer = countSlice.reducer;
export const counterActions = countSlice.actions;
