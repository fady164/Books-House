import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  bookDetails: null,
  editBook: false,
  dataEditBook: {},
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (_, thunckAPI) => {
    const { rejectWithValue } = thunckAPI;
    try {
      const response = await axios.get("/books");
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
      const res = await axios.post("/books", book);
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
      await axios.delete(`/books/${book.id}`, book.id);
      const filterArr = state.books.books.filter((ele) => ele.id !== book.id);
      return filterArr;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getBook = createAsyncThunk(
  "books/getBook",
  async ({ id, formValue }, thunckAPI) => {
    const { rejectWithValue } = thunckAPI;
    try {
      const { data } = await axios.get(`/books/${id}`, id);
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
      const res = await axios.put(`/books/${id}`, formValue);
      return res.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

// const booksSlice = createSlice({
//   name: "books",
//   initialState,
//   reducers: {
//     changeBookData: (state, action) => {
//       state.dataEditBook = action.payload;
//     },
//   },
//   extraReducers: {
//     [getBooks.fulfilled]: (state, action) => {
//       state.books = action.payload;
//     },
//     [deleteBook.fulfilled]: (state, action) => {
//       state.books = action.payload;
//     },
//   },
// });

// export const booksReducer = booksSlice.reducer;
// export const booksActions = booksSlice.actions;
