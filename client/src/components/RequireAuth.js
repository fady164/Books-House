import React from "react";
import { authApiSlice } from "../features/authApiSlice";
import { useState, useEffect } from "react";
import { selectCurrentUser } from "../store/client/reducers/userSlice";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../features/authApiSlice";
import FullScreenLoader from "./FullScreenLoader";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
function RequireAuth({ allowedRoles }) {
   const location = useLocation();
   const user = useSelector((state) => state.userState);
   return user?.token && allowedRoles.includes(user?.allowedRole) ? (
      <Outlet />
   ) : user?.token && user ? (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
   ) : (
      <Navigate to="/auth/login" state={{ from: location }} replace />
   );
   // return (cookies.logged_in || user) &&
   //    allowedRoles.includes(user?.allowedRole) ? (
   //    <Outlet />
   // ) : cookies.logged_in && user ? (
   //    <Navigate to="/unauthorized" state={{ from: location }} replace />
   // ) : (
   //    <Navigate to="/auth/login" state={{ from: location }} replace />
   // );
}

export default RequireAuth;
