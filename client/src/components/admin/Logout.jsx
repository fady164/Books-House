import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useLogoutAdminMutation } from "../../features/adminApiSlice";
import FullScreenLoader from "../FullScreenLoader";

export default function Logout() {
   const location = useLocation();
   const [logoutAdmin, { isLoading }] = useLogoutAdminMutation();
   useEffect(() => {
      logoutAdmin();
   }, []);

   return (
      <>
         {isLoading ? (
            <FullScreenLoader />
         ) : (
            <Navigate to="/home" state={{ from: location }} replace />
         )}
      </>
   );
}
