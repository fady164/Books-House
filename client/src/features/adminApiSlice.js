import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customAdminFetch from "../components/CustomFetchBaseAdmin";
import {
  setUserInState,
  logoutInState,
} from "../store/client/reducers/userSlice";
export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: customAdminFetch,
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (credentials) => {
        return {
          url: "login",
          method: "POST",
          body: credentials,
          credentials: "include",
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUserInState(data));
        } catch (error) {
          console.log("failed login admin request ", error);
        }
      },
    }),
    forgetPasswordAdmin: builder.mutation({
      query(data) {
        return {
          url: "forgetPassword",
          method: "POST",
          body: { ...data },
          credentials: "include",
        };
      },
    }),
    sendCodeAdmin: builder.mutation({
      query(credientials) {
        return {
          url: "sendCode",
          method: "POST",
          body: { ...credientials },
        };
      },
    }),
    verifyAdmin: builder.query({
      query() {
        return {
          url: "verify",
          method: "GET",
          credientials: "include",
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInState(data));
        } catch (error) {
          console.log(error);
          window.href.location = "/@admin";
        }
      },
    }),
    logoutAdmin: builder.mutation({
      query() {
        return {
          url: "logout",
          method: "DELETE",
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            logoutInState();
            window.href.location = "/home";
          }
        } catch (error) {
          console.log(error);
          logoutInState();
          window.href.location = "/auth/login";
        }
      },
    }),
  }),
});
export const {
  useLoginAdminMutation,
  useLogoutAdminMutation,
  useVerifyAdminQuery,
  useForgetPasswordAdminMutation,
  useSendCodeAdminMutation,
} = adminApiSlice;
