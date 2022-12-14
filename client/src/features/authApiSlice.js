import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "../services/authApi";
import {
  logoutInState,
  setUserInState,
} from "../store/client/reducers/userSlice";
import customFetchBase from "../components/CustomFetchBase";
export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "signUp",
        method: "POST",
        body: credentials,
      }),
      tagTypes: ["User"],
      transformResponse: (result) => result,
    }),

    loginUser: builder.mutation({
      query: (credentials) => {
        return {
          url: "login",
          method: "POST",
          body: credentials,
          credientials: "include",
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInState(data));
        } catch (error) {
          console.log("Error LOGIN : ", error);
        }
      },
    }),
    forgetPassword: builder.mutation({
      query(data) {
        return {
          url: "forgetPassword",
          method: "POST",
          body: { ...data },
          credentials: "include",
        };
      },
    }),
    sendCode: builder.mutation({
      query(credientials) {
        return {
          url: "sendCode",
          method: "POST",
          body: { ...credientials },
        };
      },
    }),
    verifyEmail: builder.mutation({
      query({ verificationCode }) {
        return {
          url: `confirmEmail/${verificationCode}`,
          method: "GET",
        };
      },
    }),
    updateProfile: builder.mutation({
      query() {
        return {
          url: `updateProfile`,
          method: "POST",
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: `logoutMe`,
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

    getUser: builder.query({
      query() {
        return {
          url: "profile",
          credentials: "include",
        };
      },
      transformResponse: (result) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserInState(data));
        } catch (error) {
          console.log(error);
          window.href.location = "/auth/login";
        }
      },
    }),
  }),
});

export const {
  useSendCodeMutation,
  useGetUserQuery,
  useVerifyEmailMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgetPasswordMutation,
  useUpdateProfileMutation,
} = authApiSlice;
