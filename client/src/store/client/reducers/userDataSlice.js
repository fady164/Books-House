import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { users: {}, user: {} };

export const getUserData = createAsyncThunk(
   "users/getUserData",
   async (_, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      try {
         const response = await axios.get("/user/getallusers");
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);
export const getUser = createAsyncThunk(
   "users/getUser",
   async (id, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      try {
         const response = await axios.get(`/user/getuser/${id}`, id);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);
export const updateUser = createAsyncThunk(
   "books/updateBook",
   async ({ id, newUser }, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      try {
         const res = await axios.patch(`/book/updateBook/${id}`, newUser);
         return res.data;
      } catch (error) {
         rejectWithValue(error.message);
      }
   }
);

export const userDataSlice = createSlice({
   name: "userData",
   initialState,
   reducers: {},
   extraReducers: {
      [getUserData.fulfilled]: (state, action) => {
         state.users = action.payload;
      },
      [getUser.fulfilled]: (state, action) => {
         state.user = action.payload;
      },
   },
});

export const userDataReducer = userDataSlice.reducer;
export const userDataActions = userDataSlice.actions;
