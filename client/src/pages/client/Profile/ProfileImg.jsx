import React from "react";

export default function ProfileImg() {
  return (
    <div className="card-body text-center">
      <img
        className="img-fluid img-account-profile rounded-circle mb-2  "
        src="http://bootdey.com/img/Content/avatar/avatar1.png"
        alt=""
      />
      {/* <button className="btn btn-warning" type="button">
        Change Avatar
      </button> */}
    </div>
  );
}
