import React from "react";
// import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./aside.css";

export default function Aside() {
   const categoriesHandler = (e) => {
      // console.log(e.target.name);
   };

   return (
      <div>
         {/* Search */}
         <div className="mb-4 border-bottom">
            <h5 className="mb-3 fw-bold">Categories</h5>
            <div className="categories d-flex flex-column ">
               <a className="mb-1 text-lead fw-lighter" name="all">
                  All
               </a>
               <a className="mb-1 text-lead fw-lighter" name="clothes">
                  Fiction
               </a>
               <a className="mb-1 text-lead fw-lighter" name="watches">
                  Non-Fiction
               </a>
               <a className="mb-1 text-lead fw-lighter" name="footwear">
                  Natural
               </a>
            </div>
         </div>
         <div className="mb-4">
            <h5 className="mb-3 fw-bold">Price</h5>
            <div className="categories d-flex flex-column ">
               <Form>
                  <Form.Group className="mb-3 ">
                     <Form.Label>From</Form.Label>
                     <Form.Control
                        type="text"
                        className="border border-1 rounded-0"
                        placeholder=""
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>To</Form.Label>
                     <Form.Control
                        type="text"
                        className="border border-1 rounded-0"
                        placeholder=""
                     />
                  </Form.Group>
                  <Button
                     variant="dark"
                     className="rounded-0 px-4"
                     type="submit"
                  >
                     Filter
                  </Button>
               </Form>
            </div>
         </div>
      </div>
   );
}
