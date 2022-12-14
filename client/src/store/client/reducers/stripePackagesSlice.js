import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  stripePackagesData: [],
};

export const getstripePackages = createAsyncThunk(
  "getallpayments/packages",
  async (_, thunckAPI) => {
    const { rejectWithValue } = thunckAPI;
    try {
      const response = await axios.get("/getallpayments/packages");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const stripePackageSlice = createSlice({
  name: "stripePackagesSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getstripePackages.fulfilled]: (state, action) => {
      state.stripePackagesData = action.payload;
    },
  },
});

export const stripePackagesReducer = stripePackageSlice.reducer;
export const stripePackagesActions = stripePackageSlice.actions;
