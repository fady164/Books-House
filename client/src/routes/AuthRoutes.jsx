import { Outlet } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import AuthFooter from "../pages/client/authPages/AuthFooter/AuthFooter";

function AuthRoutes() {
  return (
    <div>
      <Outlet />
      <AuthFooter />
    </div>
  );
}

export default AuthRoutes;
