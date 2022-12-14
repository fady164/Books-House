/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./review.css";

export default function BookReview({ data }) {
   const navigate = useNavigate();

   const toBookDetail = () => {
      navigate(`/reviewdetails/${data?._id}`);
   };

   return (
      <div className=" pb-4 mx-4 border-top border-dark">
         <div className="pt-2 row">
            {/* Date */}
            <div className="col-lg-2 col-sm-12 mt-4 d-flex flex-column ">
               <p className="text-uppercase ">novamber 15, 2022</p>
               <p>
                  0 <FaComments />
               </p>
            </div>
            {/* Title & Review */}
            <div className="col-lg-6 col-sm-12 d-flex flex-column">
               <p className="text-uppercase">book review</p>
               <a
                  className="Review-title fs-2 text-capitalize fs-3"
                  onClick={() => {
                     toBookDetail();
                  }}
               >
                  book review: {data.title}
               </a>
               <p className="text-lead pt-3 fs-5">
                  {data.desc.split(",")[0]}Check out what {data.reviwer} has to
                  say in her book review of this indie thriller
               </p>
            </div>
            {/* Img */}
            <div className="col-lg-4 col-sm-12 ">
               <div className=" ">
                  <img
                     className="h-75 w-100 Review-title"
                     onClick={() => {
                        toBookDetail();
                     }}
                     src={data.imageSrc}
                     alt=""
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
