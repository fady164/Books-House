import React, { useState } from "react";
import { useLogoutUserMutation } from "../../../features/authApiSlice";
import { logoutInState } from "../../../store/client/reducers/userSlice";
import "./MainProfile.css";
import MyOrder from "./MyOrder";
import MyPackages from "./MyPackages";
import MyProfile from "./MyProfile";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import ProfileImg from "./ProfileImg";
import Null from "./Null";
export default function MainProfile() {
  const [active, setActive] = useState("profile");
  const clickHandler = (data) => {
    setActive(data);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser, { isLoading, isError, isSuccess, error }] =
    useLogoutUserMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(logoutInState());
      toast.success("Logout Successfully");
      navigate("/");
    }

    if (isError) {
      console.log(error);

      toast.error(error?.data, {
        position: "top-right",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const logoutHandler = () => {
    logoutUser();
  };
  return (
    <div className="profile">
      <div className="container-xl px-4 mt-4 rounded">
        <div className="row ">
          <div className="col-xl-3 col-md-3 col-sm-12">
            <div className="card mb-4 mb-xl-0 ">
              <div className="card-header">My Account </div>
              <div className="card-body">
                <ProfileImg />
                <nav className="mProfile nav flex-lg-column nav-pills  ">
                  <button
                    className="btn btn-outline-warning text-dark rounded my-2"
                    onClick={() => {
                      clickHandler("profile");
                    }}
                  >
                    Profile setting
                  </button>
                  <button
                    className="btn btn-outline-warning text-dark rounded my-2"
                    onClick={() => {
                      clickHandler("order");
                    }}
                  >
                    My Orders
                  </button>
                  <button
                    className="btn btn-outline-warning text-dark  rounded my-2"
                    onClick={() => {
                      clickHandler("packages");
                    }}
                  >
                    My Packages Payment
                  </button>
                  <button
                    className="btn btn-outline-warning text-dark  rounded my-2"
                    onClick={() => {}}
                  >
                    Forget Your Password
                  </button>
                  <button
                    className="btn btn-outline-secondary  rounded my-2"
                    onClick={logoutHandler}
                  >
                    Log out
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-md-8 col-sm-12">
            <div className="card mb-4">
              <div className="card-header">Information</div>
              <div className="card-body">
                {active === "profile" && <MyProfile />}
                {active === "order" && <MyOrder />}
                {active === "packages" && <MyPackages />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
