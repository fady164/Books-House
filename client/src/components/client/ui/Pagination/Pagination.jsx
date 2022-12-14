import React from "react";

export default function Pagination({
   totalItems,
   itemsPerPage,
   setCurrentPage,
   currentPage,
}) {
   let pages = [];
   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pages.push(i);
   }
   return (
      <div className="d-flex justify-content-center">
         {pages.map((page, index) => {
            return (
               <button
                  onClick={() => {
                     setCurrentPage(page);
                  }}
                  key={index}
                  className={
                     currentPage === page
                        ? "btn btn-outline-dark mx-1 rounded-0 active"
                        : "btn btn-outline-dark mx-1 rounded-0"
                  }
               >
                  {page}
               </button>
            );
         })}
      </div>
   );
}
