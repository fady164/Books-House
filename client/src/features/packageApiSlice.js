import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { packageActions } from "../store/client/reducers/packageSlice";

const { setDataInLocalState } = packageActions;

export const packageApi = createApi({
   baseQuery: fetchBaseQuery({ baseUrl: "/package" }),
   reducerPath: "packageApi",
   endpoints: (build) => ({
      getPackageData: build.query({
         query: (credentials) => {
            return {
               url: `/getall`,
               method: "GET",
               body: credentials,
            };
         },

         providesTags: [{ title: "Package", id: "LIST" }],

         transformResponse: (result) => result,

         async onQueryStarted(args, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(setDataInLocalState(data));
            } catch (error) {
               return error;
            }
         },
      }),

      updatePackageData: build.mutation({
         query: (credentials) => {
            return {
               url: `/update/${credentials._id}`,
               method: "PUT",
               body: credentials,
            };
         },
      }),
   }),
});

export const { useGetPackageDataQuery, useUpdatePackageDataMutation } =
   packageApi;
