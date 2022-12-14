import React from "react";
import { NavLink } from "react-router-dom";
import "./errorNotFound.css";

export default function ErrorNotFound() {
   return (
      <div className="w-100 h-100">
         <div className="row container mx-auto">
            <div className="col-md-6">
               <img
                  src="./images/errorImage.png"
                  className="w-100 h-100"
                  alt=""
               />
            </div>
            <div className="setStyle col-md-6">
               <h1 className="text-center ">404</h1>
               <p className="text-center">Sorry,This page doesn't exist</p>
               <NavLink
                  className="btn btn-outline-dark rounded-5 col-md-6 mx-auto"
                  to="/"
               >
                  Go Back
               </NavLink>
            </div>
         </div>
      </div>
   );
}
