import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stripeOrdersData: [],
};

export const getstripeOrders = createAsyncThunk(
  "/getallpayments/orders",
  async (_, thunckAPI) => {
    const { rejectWithValue } = thunckAPI;
    try {
      const response = await axios.get("/getallpayments/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const stripeOrderslice = createSlice({
  name: "stripeOrdersSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getstripeOrders.fulfilled]: (state, action) => {
      state.stripeOrdersData = action.payload;
    },
  },
});

export const stripeOrdersReducer = stripeOrderslice.reducer;
export const stripeOrdersActions = stripeOrderslice.actions;
