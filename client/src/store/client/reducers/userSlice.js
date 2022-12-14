import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
  role: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logoutInState: () => initialState,
    setUserInState: (state, { payload }) => {
      const { allowedRole, user, token } = payload;
      console.log(payload);
      state.user = user;
      state.token = token;
      state.role = allowedRole;
    },
    setTokenInState: (state, { payload }) => {
      console.log(payload);
      state.token = payload.token;
    },
  },
});

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.userState.user;
export const selectCurrentToken = (state) => state.userState.token;

export const { logoutInState, setUserInState, setTokenInState } =
  userSlice.actions;
