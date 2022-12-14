import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorData: {},
  isLoading: false,
  error: null,
};

// export const addAuthor = createAsyncThunk(
//   "author",
//   async (author, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const response = await axios.post("/author", author);
//       console.log("send");
//       return response.data.data;
//     } catch (error) {
//       rejectWithValue(error.message);
//     }
//   }
// );
const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    addAuthor: (state, action) => {
      state.authorData = action.payload;
    },
  },
  extraReducers: {},
  //------------------ ADD Book
  // [addAuthor.pending]: () => {},
  // [addAuthor.fulfilled]: (state, action) => {
  //   state.authorData = action.payload.author;
  //   console.log(state.action.payload);
  // },
  // [addAuthor.rejected]: () => {},
});

export const authorReducer = authorSlice.reducer;
export const authorActions = authorSlice.actions;
