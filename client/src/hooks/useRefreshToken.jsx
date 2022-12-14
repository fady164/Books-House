// import React from "react";
// import { setUserInState } from "../store/client/reducers/userSlice";
// import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
// import { selectCurrentUser } from "../store/client/reducers/userSlice";
// // const baseQuery = fetchBaseQuery({
// //   credentials: "include",
// //   baseUrl: `/user/`,

// //   prepareHeaders: (headers, { getState }) => {
// //     console.log("headers", headers);

// //     const token = getState().userState?.token;
// //     if (token) {
// //       headers.set("Authorization", `Bearer ${token}`);
// //     }
// //     return headers;
// //   },
// // });
// const useRefreshToken = () => {
//   const user = useSelector(selectCurrentUser);

//   const refresh = async () => {
//     const refreshResult = fetchBaseQuery({
//       credentials: "include",
//       baseUrl: `/user/`,
//     });
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().userSlice.user;
//       api.dispatch(setUserInState({ ...refreshResult.data, user }));
//       let result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logoutInState());
//       console.log("logout me -- we should call dispatch logoutUser");
//     }
//   };

//   return <div>useRefreshToken</div>;
// };

// export default useRefreshToken;
