import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAdminState } from "../store/client/reducers/adminSlice";
import {
  setUserInState,
  logoutInState,
  setTokenInState,
} from "../store/client/reducers/userSlice";

const baseQuery = fetchBaseQuery({
  credentials: "include",
  baseUrl: `/user/`,

  prepareHeaders: (headers, { getState }) => {
    const token = getState().userState?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.error?.originalStatus === 401 ||
    result?.error?.data === "No token founded"
  ) {
    console.log("Sending refresh token!");
    const refreshResult = await baseQuery("refreshMe", api, extraOptions);
    console.log("After calling Refresh Me", refreshResult);
    console.log("DATA FROM REFRESH Me", refreshResult?.data);

    if (refreshResult?.data) {
      const user = api.getState().userState.user;
      console.log("api getstate of user", user);
      console.log(refreshResult.data);
      api.dispatch(setTokenInState(refreshResult.data));
      console.log("refresh result after calling refresh", {
        ...refreshResult.data,
        user,
      });

      let result = await baseQuery(args, api, extraOptions);
    } else {
      window.location.href = "/auth/login";
      api.dispatch(logoutInState());
      console.log("logout me -- we should call dispatch logoutUser");
    }
  }
  // if (result?.error?.data === "No user founded") {
  //   console.log("No user founded because logout");
  //   api.dispatch(logoutInState());
  //   window.location.href = "/auth/login";
  // }

  return result;
};
export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
