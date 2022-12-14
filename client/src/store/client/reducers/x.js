// import { createSlice } from "@reduxjs/toolkit";
// import { authApi } from "../../../services/authApi";
// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: null, token: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(
//       authApi.endpoints.login.matchFulfilled,
//       (state, { payload }) => {
//         state.token = payload.authorisation.token;
//         state.user = payload.user;
//       }
//     );
//   },
// });
// export const selectCurrentUser = (state) => state.auth.user;
// export const authReducer = authSlice.reducer;
// export const authActions = authSlice.actions;
