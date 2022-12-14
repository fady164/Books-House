import React from "react";
import { Link } from "react-router-dom";
import { BiGlasses } from "react-icons/bi";

const PackageCard = ({ item, handleShow, setPackages }) => {
   const clickHandler = (item) => {
      handleShow();
      setPackages(item);
   };
   return (
      <div className="package__item col-lg col-md-12 mb-sm-5">
         <div className="package__details">
            <div className="package__header mb-5">
               <img className="demo-bg" src="./images/book1.jpg" alt="" />
               <div className="demo-content">
                  <h3 className="fw-bold">{item.packageName}</h3>
                  {/* <p className="text-muted">For Small teams or office</p> */}
               </div>
            </div>
            <div className="mx-4 mb-5">
               {/* <p>{item.desc}</p> */}
               <ul className="package__features">
                  {item["packageDesc"].map((descItem, index) => {
                     return (
                        <li className="text-muted" key={index}>
                           <div className="row">
                              <div className="col-2">
                                 <button className="btn p-0">
                                    <BiGlasses />
                                 </button>
                              </div>
                              <div className="col-10">{descItem}</div>
                           </div>
                        </li>
                     );
                  })}
               </ul>
               <div className="package__control d-flex flex-column align-items-center">
                  <div className="package__price pt-3 d-flex align-items-center">
                     <span className="price fs-5">${item.packagePrice}</span>
                     <span>/Monthly</span>
                  </div>
                  <button
                     className="btn btn-warning mt-4 rounded-pill"
                     onClick={() => {
                        clickHandler(item);
                     }}
                  >
                     <Link to={item.path}></Link>Buy Now
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PackageCard;
