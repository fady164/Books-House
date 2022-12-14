import React from "react";
import "./breadcrumb.css";

export default function BreadCrumb({ title, breadCrumb }) {
   return (
      <div>
         <nav aria-label="breadcrumb" className="breadcrumb-Container">
            <div className="container d-flex justify-content-between h-100 px-4 align-items-center">
               <div>
                  <h1 className="text-capitalize">{title}</h1>
               </div>
               <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                     <a
                        className="link-bread fw-bold text-capitalize"
                        href="home"
                     >
                        Home
                     </a>
                  </li>
                  <li
                     className="breadcrumb-item active fw-semi-bold text-capitalize"
                     aria-current="page"
                  >
                     {breadCrumb}
                  </li>
               </ol>
            </div>
         </nav>
      </div>
   );
}
