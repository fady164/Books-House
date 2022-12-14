import React, { useMemo } from "react";
import { selectCurrentUser } from "../store/client/reducers/userSlice";
import { useSelector } from "react-redux";
export default function useAuth() {
   const currentUserState = useSelector(selectCurrentUser);

   return useMemo(() => ({ currentUserState }), [currentUserState]);
}
