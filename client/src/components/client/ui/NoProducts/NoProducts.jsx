import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function NoProducts() {
   return (
      <div className="d-flex flex-column  align-items-center">
         <div className="text-center fw-bold fs-1">
            <AiOutlineExclamationCircle />
         </div>
         <div>
            <p className="fs-5">Sorry, No Products Found</p>
         </div>
      </div>
   );
}
