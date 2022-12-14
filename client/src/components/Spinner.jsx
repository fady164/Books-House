import React from "react";

export default function Spinner() {
  return (
    <div className="col-12 text-center ">
      <div class="spinner-grow text-primary m-1" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-warning m-1" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="spinner-grow text-danger m-1" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
