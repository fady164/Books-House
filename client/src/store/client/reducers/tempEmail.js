import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tempEmail: null,
};

const tempEmailSlice = createSlice({
  name: "tempEmail",
  initialState,
  reducers: {
    addTempEmail: (state, action) => {
      state.tempEmail = action.payload.email;
    },
  },
});

export const tempEmailReducer = tempEmailSlice.reducer;
export const tempEmailActions = tempEmailSlice.actions;
