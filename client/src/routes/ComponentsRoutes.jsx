import { Outlet } from "react-router-dom";

import MyNav from "../components/client/ui/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function ComponentsRoutes() {
  return (
    <div>
      <MyNav />
      <ToastContainer />
      <Outlet />
      {/* <Counter /> */}
    </div>
  );
}

export default ComponentsRoutes;
