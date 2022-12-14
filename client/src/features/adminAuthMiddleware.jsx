import React from "react";
import { authApiSlice, useGetUserMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import FullScreenLoader from "../components/FullScreenLoader";
import { Outlet } from "react-router-dom";
import { selectCurrentToken } from "../store/client/reducers/userSlice";
import { adminApiSlice } from "./adminApiSlice";
function AuthMiddleware() {
  const token = useSelector(selectCurrentToken);

  // const [getUser, { data, isSuccess, isLoading, isError }] =
  //   useGetUserMutation();

//   const { isLoading, isFetching } = authApiSlice.endpoints.getUser.useQuery(
//     null,
//     {
//       skip: !!token,
//     }
//   );

    const [verifyAdmin, { data, isSuccess, isLoading, isError }] =
      adminApiSlice.endpoints.verifyAdmin.useQuery()

  const loading = isLoading || isFetching;


  return <>{loading ? <FullScreenLoader /> : <Outlet />}</>;
}

export default AuthMiddleware;
