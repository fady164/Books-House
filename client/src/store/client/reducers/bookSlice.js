import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   books: [],
   bookDetails: null,
   bookComments: [],
   bookCart: [],
   isLoadind: false,
   editBook: false,
   dataEditBook: {},
   bookStoreCategory: "all",
   bookStoreType: "all",
   maxPriceFilter: 9999,
   minPriceFilter: 0,
};

export const getBooks = createAsyncThunk(
   "books/getBooks",
   async (_, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      try {
         const response = await axios.get("/book/getall");
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const addBook = createAsyncThunk(
   "books/addBook",
   async (book, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      try {
         const res = await axios.post("/book/addnewbook", book);
         return res.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export const deleteBook = createAsyncThunk(
   "books/deleteBook",
   async (book, thunckAPI) => {
      const { rejectWithValue, getState } = thunckAPI;
      const state = getState();
      try {
         await axios.delete(`/book/remove/${book._id}`, book._id);
         const filterArr = state.books.books.filter(
            (ele) => ele._id !== book._id
         );
         return filterArr;
      } catch (error) {
         rejectWithValue(error.message);
      }
   }
);

export const getBook = createAsyncThunk(
   "books/getBook",
   async ({ _id }, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      try {
         const { data } = await axios.get(`book/${_id}`, _id);
         return data;
      } catch (error) {
         rejectWithValue(error.message);
      }
   }
);
export const updateBook = createAsyncThunk(
   "books/updateBook",
   async ({ id, formValue }, thunckAPI) => {
      const { rejectWithValue } = thunckAPI;
      try {
         const res = await axios.put(`/book/updateBook/${id}`, formValue);
         return res.data;
      } catch (error) {
         rejectWithValue(error.message);
      }
   }
);

const booksSlice = createSlice({
   name: "books",
   initialState,
   reducers: {
      changeBookData: (state, action) => {
         state.dataEditBook = action.payload;
      },
      setBookStoreCategory: (state, action) => {
         state.bookStoreCategory = action.payload;
      },
      setBookStoreType: (state, action) => {
         state.bookStoreType = action.payload;
      },
      setMaxPriceFilter: (state, action) => {
         if (action.payload) {
            state.maxPriceFilter = Number(action.payload);
         } else {
            state.maxPriceFilter = 9999;
         }
      },
      setMinPriceFilter: (state, action) => {
         if (action.payload) {
            state.minPriceFilter = Number(action.payload);
         } else {
            state.minPriceFilter = 0;
         }
      },
      getDataBook: (state, action) => {
         state.books = action.payload;
      },
      setFilteredBook: (state, action) => {
         state.books = action.payload;
      },
      getBookDetails: (state, action) => {
         state.bookDetails = action.payload;
      },
   },
   extraReducers: {
      [getBooks.fulfilled]: (state, action) => {
         state.books = action.payload;
      },
      [deleteBook.fulfilled]: (state, action) => {
         state.books = action.payload;
      },
      [getBook.fulfilled]: (state, action) => {
         state.bookDetails = action.payload;
      },
      // [commentBook.fulfilled]: (state, action) => {
      //    state.bookDetails = action.payload;
      // },
   },
});

export const booksReducer = booksSlice.reducer;
export const booksActions = booksSlice.actions;
