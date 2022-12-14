import { createSlice } from "@reduxjs/toolkit";
import { useGetPackageDataQuery } from "../../../features/packageApiSlice";

const initialState = {
   packageData: [],
   packageLoading: false,
   packageError: null,
};
const packageSlice = createSlice({
   name: "package",
   initialState,
   reducers: {
      setDataInLocalState: (state, action) => {
         state.packageData = action.payload;
      },
   },
});

export const packageReducer = packageSlice.reducer;
export const packageActions = packageSlice.actions;
