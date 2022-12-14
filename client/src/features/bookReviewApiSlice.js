import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { bookReviewActions } from "../store/client/reducers/bookReviewSlice";
const {
   getDataBookReview,
   addNewBookReview,
   setFilteredBookReview,
   getReviewById,
} = bookReviewActions;

export const bookReviewApiSlice = createApi({
   baseQuery: fetchBaseQuery({ baseUrl: "/bookreview/" }),
   reducerPath: "reviewsApiSlice",
   tagTypes: [{ title: "REVIEWS", id: "REVIEWS_LIST" }],

   endpoints: (builder) => ({
      getBookReviews: builder.query({
         query() {
            return {
               url: "getall",
               credentials: "include",
            };
         },
         providesTags: [{ title: "REVIEWS", id: "REVIEWS_LIST" }],
         transformResponse: (result) => result,
         async onQueryStarted(args, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(getDataBookReview(data));
            } catch (error) {
               console.log(error);
            }
         },
      }),

      getBookReviewById: builder.query({
         query: (id) => `${id}`,
         providesTags: (result, error, id) => [{ title: "REVIEWS", id: id }],
      }),

      // getBookReviewById: builder.query({
      //    query(id) => `${id}` {
      //       console.log("id from rtk" , id)
      //       return {
      //          url: `${id}`,
      //          method: "GET",
      //          credentials: "include",
      //       };
      //    },
      //    invalidatesTags: [{ title: "REVIEWS", id: "REVIEWS_LIST" }],
      //    async onQueryStarted(args, { queryFulfilled }) {
      //       try {

      //          const { data } = await queryFulfilled;

      //          console.log("review" , data);
      //       } catch (error) {
      //          console.log(error);
      //       }
      //    },
      // }),

      deleteBookReview: builder.mutation({
         query(bookReview) {
            const { _id } = bookReview;
            return {
               url: `remove/${_id}`,
               method: "DELETE",
               body: _id,
               credentials: "include",
            };
         },
         invalidatesTags: [{ title: "REVIEWS", id: "REVIEWS_LIST" }],
         async onQueryStarted(bookReview, { dispatch, getState }) {
            try {
               const state = getState();

               const filterArr = state.bookReviews.bookReviews.filter(
                  (ele) => ele._id !== bookReview._id
               );
               dispatch(setFilteredBookReview(filterArr));
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
         invalidatesTags: [{ title: "REVIEWS", id: "REVIEWS_LIST" }],
         async onQueryStarted(comingData, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(addNewBookReview(data));
            } catch (error) {
               console.log(error);
            }
         },
      }),

      updateBookReview: builder.mutation({
         query({ id, formValue }) {
            return {
               url: `updateBookReview/${id}`,
               method: "PUT",
               body: formValue,
               credentials: "include",
            };
         },
         invalidatesTags: [{ title: "REVIEWS", id: "REVIEWS_LIST" }],
         async onQueryStarted(args, { getState, dispatch, queryFulfilled }) {
            try {
               const state = getState();
               const { data } = await queryFulfilled;
               console.log(data);
               const updatedlist = state.bookReviews.bookReviews.map((ele) =>
                  ele._id === data._id ? data : ele
               );
               console.log("updated list", updatedlist);
               dispatch(getDataBookReview(updatedlist));
            } catch (error) {
               console.log(error);
            }
         },
      }),
   }),
});

export const {
   useGetBookReviewsQuery,
   useAddBookReviewMutation,
   useDeleteBookReviewMutation,
   useUpdateBookReviewMutation,
   useGetBookReviewByIdQuery,
} = bookReviewApiSlice;
