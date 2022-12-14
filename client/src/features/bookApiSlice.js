import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { booksActions } from "../store/client/reducers/bookSlice";

const { getDataBook, setFilteredBook, getBookDetails } = booksActions;

export const bookApiSlice = createApi({
   reducerPath: "booksApiSlice",
   baseQuery: fetchBaseQuery({ baseUrl: "/book/" }),
   tagTypes: [{ title: "BOOKS", id: "BOOKS_LIST" }],
   endpoints: (builder) => ({
      getBooks: builder.query({
         query: () => {
            return {
               url: "getall",
               credentials: "include",
            };
         },
         transformResponse: (result) => result,
         async onQueryStarted({ dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(getDataBook(data));
            } catch (error) {
               console.log(error);
            }
         },
      }),
      addBook: builder.mutation({
         query: (cominData) => {
            return {
               url: "addnewbook",
               method: "POST",
               body: cominData,
               credentials: "include",
            };
         },
      }),
      deleteBook: builder.mutation({
         query(book) {
            const { _id } = book;
            return {
               url: `remove/${_id}`,
               method: "DELETE",
               body: _id,
               credentials: "include",
            };
         },
         async onQueryStarted(book, { dispatch, getState }) {
            try {
               const state = getState();
               const filterArr = state.books.books.filter(
                  (ele) => ele._id !== book._id
               );
               dispatch(setFilteredBook(filterArr));
            } catch (error) {
               console.log(error);
            }
         },
      }),
      getBook: builder.query({
         query: ({ _id }) => {
            return {
               url: `getBook/${_id}`,
            };
         },
         async onQueryStarted({ dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(getBookDetails(data));
            } catch (error) {
               console.log(error);
            }
         },
      }),
      updateBook: builder.mutation({
         query: ({ id, formValue }) => {
            return {
               url: `updatebook/${id}`,
               method: "PUT",
               body: formValue,
            };
         },
      }),
      addComment: builder.mutation({
         query: ({ value, id }) => {
            return {
               url: `${id}/commentBook`,
               method: "POST",
               body: value,
               credentials: "include",
            };
         },
         transformResponse: (result) => result,
         async onQueryStarted(args, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               console.log("comment", data);
               // dispatch(setDataInLocalState(data));
               console.log("done added comment to state", data);
            } catch (error) {
               console.log(
                  "Error Inside onQueryStarted RTK QUERY FROM bookSlice : ",
                  error
               );
            }
         },
      }),
   }),
});

export const {
   useGetBooksQuery,
   useGetBookQuery,
   useAddBookMutation,
   useDeleteBookMutation,
   useUpdateBookMutation,
} = bookApiSlice;
