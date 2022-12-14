import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homepageApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/homeData" }),
  reducerPath: "homepageApi",
  tagTypes: [{ title: "Home", id: "LIST" }],

  endpoints: (build) => ({
    getHomepageData: build.query({
      query: () => "/home",
      providesTags: [{ title: "Home", id: "LIST" }],
    }),
    
  }),
});

export const { useGetHomepageDataQuery } = homepageApi;
