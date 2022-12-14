import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   bookReviews: [],
   dataEditBookReview: {},
};
export const getBookReviews = createAsyncThunk(
   "/bookreview/getall",
   async (_, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      try {
         const response = await axios.get("/bookreview/getall");
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

// export const addBookReview = createAsyncThunk(
//    "books/addBook",
//    async (bookReview, thunckAPI) => {
//       const { rejectWithValue } = thunckAPI;
//       try {
//          const res = await axios.post("/newbookreview", bookReview);
//          return res.data;
//       } catch (error) {
//          return rejectWithValue(error.message);
//       }
//    }
// );

// export const deleteBookReview = createAsyncThunk(
//    "books/deleteBook",
//    async (bookReview, thunckAPI) => {
//       const { rejectWithValue, getState } = thunckAPI;
//       const state = getState();
//       console.log(bookReview);
//       try {
//          await axios.delete(
//             `/bookReview/remove/${bookReview._id}`,
//             bookReview._id
//          );
//          const filterArr = state.bookReviews.bookReviews.filter(
//             (ele) => ele._id !== bookReview._id
//          );
//          return filterArr;
//       } catch (error) {
//          rejectWithValue(error.message);
//       }
//    }
// );
export const updateBookReview = createAsyncThunk(
   "books/updateBook",
   async ({ id, formValue }, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      console.log(formValue);
      try {
         const res = await axios.put(
            `/bookreview/updateBookReview/${id}`,
            formValue
         );
         return res.data;
      } catch (error) {
         rejectWithValue(error.message);
      }
   }
);

const bookReviewSlice = createSlice({
  name: "bookReviews",
  initialState,
  reducers: {
    setdataEditBookReview: (state, action) => {
      console.log(action.payload);
      state.dataEditBookReview = action.payload;
    },
    getDataBookReview: (state, action) => {
      console.log("data From reducer", action.payload);
      state.bookReviews = action.payload;
    },

    setFilteredBookReview: (state, action) => {
      console.log("deleted book From reducer", action.payload);
      state.bookReviews = action.payload;
    },
    addNewBookReview: (state, action) => {
      state.bookReviews.push(action.payload);
    },
   //  getReviewById: (state , action)=>{
   //    state.review=action.payload;
   //    console.log("review by id " , action.payload)
   //  }
  },
  extraReducers: {
    // [getBookReviews.fulfilled]: (state, action) => {
    //    state.bookReviews = action.payload;
    // },
    // [deleteBookReview.fulfilled]: (state, action) => {
    //    state.bookReviews = action.payload;
    // },
  },
});

export const bookReviewReducer = bookReviewSlice.reducer;
export const bookReviewActions = bookReviewSlice.actions;
