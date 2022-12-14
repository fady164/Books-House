import React from "react";
import { setUserInState } from "../store/client/reducers/userSlice";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query";


const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/validate/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({

      query() {
        return {
          url: "me",
          credentials: "include",
        };
      },
      transformResponse: (result) => result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          // data.allowedRoles == '' || ''
        } catch (error) {
          console.log(error, error);
        }
      },
    }),
  }),
});
