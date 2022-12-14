import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { bookReviewActions } from "../store/client/reducers/bookReviewSlice";
const { setDataInState } = bookReviewActions;

export const bookReviewApiSlice = createApi({
  reducerPath: "reviewsApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "/bookreview/" }),
  tagTypes: [{ title: "REVIEWS", id: "REVIEWS_LIST" }],

  endpoints: (builder) => ({
    getBookReviews: builder.mutation({
      query(bookReview) {
        return {
          url: "getall",
          method: "DELETE",
          body: bookReview,
          credentials: "include",
        };
      },
      //   transformResponse: (result) => result,
      async onQueryStarted(bookReview, { dispatch, queryFulfilled, getState }) {
        try {
          //   const { data } = await queryFulfilled;
          const state = getState();
          const filterArr = state.bookReviews.bookReviews.filter(
            (ele) => ele._id !== bookReview._id
          );
          console.log("get all books", data);
          dispatch(setDataInState(filterArr));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    addBookReview: builder.mutation({
      query(comingData) {
        return {
          url: "newbookreview",
          method: "POST",
          body: comingData,
          credentials: "include",
        };
      },
    }),
  }),
});
