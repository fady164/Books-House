// import React from "react";

// import { motion } from "framer-motion";
// import { TbBook2 } from "react-icons/tb";
// import PackageCard from "../pages/client/Home/PackageCard";


// const numbers = [{title:"hello" , specifications:["Drag & Drop Builder" , "1,000's of Templates" , "Blog Support Tools" , "eCommerce Store"]},{title:"welcome" , specifications:["Drag & Drop Builder" , "1,000's of Templates" , "Blog Support Tools" , "eCommerce Store"]}];
// const PackageQuery = ({ pricingArray }) => {

  // return (
    // <div className = "row packages__list">
      {/* {pricingArray.map((service, index) => {
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="single-price col-lg-3 col-md-6 d-flex flex-column justify-content-center p-4"
            key={index}
          >
            <div>
              <div className="top-part transition-colors">
                <div className="book__icon w-100">
                  <TbBook2 />
                </div>
                <h4 className="text-center text-sm">{service.packageName}</h4>
                <p className="text-center">For the individuals</p>
              </div>
              <div className="package-list text-center text-muted">
                <ul>
                  <hr />
                  <li className="">{service.reviewsNumber}</li>
                  <hr />
                  <li className="">{service.reviewsNumber}</li>
                  <hr />
                  <li className="">{service.reviewsNumber}</li>
                  <hr />
                </ul>
              </div>
              <div className="bottom-part text-center">
                <h1 className="text-center fs-2 fw-bold price">
                  {service.packagePrice}
                </h1>
                <a
                  className="price-btn text-uppercase px-4 py-2 fw-bold"
                  href="#"
                >
                  Buy Now
                </a>
              </div>
            </div>
          </motion.div>
        );
      })} */}
                  // return(
          //           <div className="package__item">
          //             <div className="package__details rounded">
          //               <div className="package__header mb-5">
          // <h2 className="fw-bold">Free Plan</h2>
          // <p>For Small teams or office</p>
          // </div>
          // <ul class="package__features">
          // {item["specifications"].map((star , index)=>{
          //   return (
          //     <li>
          //       <button className="btn p-0"><BiGlasses/></button>{star}</li>
          //   )
          // })}
          // </ul>
          // <div className="package__control d-flex flex-column align-items-center">
          // <div class="package__price pt-3 d-flex align-items-center"><span className="price fs-5">$0</span><span>/Monthly</span></div>
          // <button className="btn btn-danger mt-1 rounded-pill"> Start free trial</button>
          // </div>
          // </div>
          // </div>
//           <PackageCard item = {item}/>
//           )
//       })}
//     </div>
//   );
// };

// export default PackageQuery;
