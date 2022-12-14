import React from "react";
import "../../../../assets/css/ReviewHeader.css";
export default function ReviewHeader({ data }) {
   return (
      <div className="row p-0 m-0">
         <div
            id="carouselExampleDark"
            className="col-12  carousel carousel-dark w-100 h-50 d-inline-block "
            data-bs-ride="carousel"
         >
            <div className="carousel-inner">
               <div className="carousel-item active  ">
                  <img
                     src={data?.imageSrc}
                     className="d-block  w-100  rounded"
                     alt="..."
                  />
                  <div className="text-start bottom-left ">
                     <div className=" w-75 d-md-block text-light mb-5">
                        <h1 className="fw-bold">{data?.title}</h1>
                        {/* <p className="fs-3 ">{data?.desc.split(".")[0]}</p> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
