import React from "react";
import "../../../../assets/css/SwiperData.css";
export default function SwiperData({
   children,
   feedTitle,
   feedPosition,
   imgSrc,
}) {
   // const sds = "sd";
   return (
      <div className="feed1 m-3 p-4 col d-flex my-5">
         <div className="myImg col-2 d-flex justify-content-center p-1">
            <img src={imgSrc} alt="profile" className="mb-5" />
         </div>
         <div className="myFeed col-10">
            <div className="mb-5">{children}</div>
            <h5 className="fw-bold">{feedTitle}</h5>
            <p>{feedPosition}</p>
         </div>
      </div>
   );
}
