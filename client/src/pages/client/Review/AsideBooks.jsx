import React from "react";

export default function AsideBooks({ src }) {
  return (
    <div className="col-sm-6 col-lg-4 p-1">
      <img className="h-100 w-100 " alt="" src={src} />
    </div>
  );
}
