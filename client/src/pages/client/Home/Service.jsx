import React from "react";
import ServiceCard from "./ServiceCard";
import "./service.css";

const Service = ({ serviceArray }) => {
   return (
      <div className="container mx-auto">
         {/* section 1 */}
         <div className="row ">
            <div className="col-md-6 mb-3 d-flex flex-column justify-content-center align-items-center">
               <div>
                  <p className="fs-6">Are You</p>
               </div>
               <h1 className="text-uppercase fw-bold">Author</h1>
               <div>
                  <p className="text-muted text-center text-capitalize">
                     Need to publish your book and get reviewed by professional
                     critic,<br></br> Get in now and discover our packages
                  </p>
               </div>
               <div className="">
                  <a
                     href="authorshouse"
                     style={{
                        color: "white",
                        background:
                           "linear-gradient(to right, #ffb75e, #ed8f03)",
                     }}
                     className=" btn btn-outline-dark border-0 rounded-0 px-4 py-2"
                  >
                     Authors House
                  </a>
               </div>
            </div>
            <div className="col-md-6 p-0">
               <img src="./images/author.avif" className="w-100 h-100" alt="" />
            </div>
         </div>
         {/* section 2 */}
         <div className="row">
            <div className="col-md-6 p-0">
               <img
                  src="./images/home-sign-in.avif"
                  className="sign-in-img col-12"
                  alt=""
               />
            </div>
            <div className="col-md-6 mt-3 d-flex flex-column justify-content-center align-items-center">
               <h2 className="text-uppercase fw-bold">Join Us Now</h2>
               <div>
                  <p className="text-muted text-center text-capitalize">
                     Discover, Save books, Read Reviews and share your comment
                  </p>
               </div>
               <div className="">
                  <a
                     href="auth/register"
                     style={{
                        color: "white",
                        background:
                           "linear-gradient(to right, #536976, #292e49)",
                     }}
                     className=" btn btn-outline-dark border-0 rounded-0 px-4 py-2"
                  >
                     Sign Up
                  </a>
               </div>
            </div>
         </div>

         {/* <section id="pricing" className="section bg-white">
            <div className="row d-flex justify-content-center">
               <div className="menu-content pb-70 col-lg-8 mb-4">
                  <div className="title text-center">
                     <h1 className="fw-semibold">Choose Your Plan</h1>
                     <p className="text-muted text-sm">
                        When someone does something that they know that they
                        shouldn`t do, did they.
                     </p>
                  </div>
               </div>
            </div>
            <div className="container text-sm">
               <div className="row">
                  {serviceArray.map((item, index) => {
                     return <ServiceCard key={index} item={item}></ServiceCard>;
                  })}
               </div>
            </div>
         </section> */}
      </div>
   );
};

export default Service;
