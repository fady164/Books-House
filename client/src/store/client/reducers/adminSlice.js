import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const adminSlice = createSlice({
  initialState,
  name: "adminSlice",
  reducers: {
    logoutAdminState: () => initialState,
    setAdminState: (state, { payload }) => {
      console.log(payload);
      state.user = payload.user;
      state.token = payload.token;
    },
  },
});

export default adminSlice.reducer;

export const { logoutAdminState, setAdminState } = adminSlice.actions;
