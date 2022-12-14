import React from "react";

const Image = ({ fallback }) => {
   return (
      <picture>
         <img src={fallback} alt="" />
      </picture>
   );
};

export default Image;
