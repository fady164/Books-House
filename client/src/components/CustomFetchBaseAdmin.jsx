import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setUserInState } from "../store/client/reducers/userSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `/admin/`,
  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = getState().userState?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customAdminFetch = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.data === "No token founded!") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          // credintials
          { url: "refreshMe" },
          api,
          extraOptions
        );
        console.log("File Custom FetchBase refresh result", refreshResult);
        if (refreshResult?.data) {
          const user = api.getState().userState.user;
          console.log(user);
          api.dispatch(setUserInState(refreshResult.data));

          result = await baseQuery(args, api, extraOptions);
          // Retry the initial query
        } else {
          // api.dispatch(logoutInState());
          // window.location.href = "/auth/login";
          console.log("redirected to logout");
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customAdminFetch;
