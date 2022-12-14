import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profilePackage: [],
  profileOrder: [],
};
export const getprofilePackage = createAsyncThunk(
  "/getallpayments/packages",
  async ({ email }, thunckAPI) => {
    const { rejectWithValue } = thunckAPI;
    try {
      const response = await axios.get(`/getallpayments/packages/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getprofileOrder = createAsyncThunk(
  "/getallpayments/orders",
  async ({ email }, thunckAPI) => {
    const { rejectWithValue } = thunckAPI;
    try {
      const response = await axios.get(`/getallpayments/orders/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profilePackageSlice = createSlice({
  name: "ProfilePayment",
  initialState,
  reducers: {},
  extraReducers: {
    [getprofilePackage.fulfilled]: (state, action) => {
      state.profilePackage = action.payload;
    },
    [getprofileOrder.fulfilled]: (state, action) => {
      state.profileOrder = action.payload;
    },
  },
});

export const profilePackageReducer = profilePackageSlice.reducer;
export const profilePackageActions = profilePackageSlice.actions;
