import React, { useState } from "react";
// import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { get } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { booksActions } from "../../../store/client/reducers/bookSlice";
import "./aside.css";

export default function Aside() {
   const dispatch = useDispatch();
   const [isError, setIsError] = useState(false);
   const [isActive, setIsActive] = useState(false);
   const {
      setBookStoreCategory,
      setMaxPriceFilter,
      setMinPriceFilter,
      setBookStoreType,
   } = booksActions;
   const categoriesHandler = (e) => {
      // e.target.className = "mb-2 text-lead fw-bold activeAside ";
      dispatch(setBookStoreCategory(e.target.name));
   };
   const typeHandler = (e) => {
      dispatch(setBookStoreType(e.target.name));
   };

   return (
      <div>
         <div className="mb-4 mt-2">
            <h5 className="mb-3  fw-bold">Categories</h5>
            <div className="categories d-flex flex-column ">
               <CategoryItem title="All" name="all" />
               <CategoryItem title="Fiction" name="fiction" />
               <CategoryItem title="Non-Fiction" name="non-fiction" />
               <CategoryItem title="Poetry" name="poetry" />
               <CategoryItem title="Fantasy" name="fantasy" />
            </div>
         </div>
         <hr></hr>
         <div className="mb-4">
            <h5 className="mb-3 fw-bold">Types</h5>
            <div className="categories d-flex flex-column ">
               <TypeItem name="all" title="All" />
               <TypeItem name="romance" title="Romance" />
               <TypeItem name="drama" title="Drama" />
               <TypeItem name="adventure" title="Adventure stories" />
               <TypeItem name="crime" title="Crime" />
            </div>
         </div>

         <hr></hr>
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
                        onChange={(e) => {
                           if (!isNaN(e.target.value)) {
                              setIsError(false);
                              dispatch(setMinPriceFilter(e.target.value));
                           } else {
                              setIsError(true);
                           }
                        }}
                     />
                  </Form.Group>

                  <Form.Group className="mb-3">
                     <Form.Label>To</Form.Label>
                     <Form.Control
                        type="text"
                        className="border border-1 rounded-0"
                        placeholder=""
                        onChange={(e) => {
                           if (!isNaN(e.target.value)) {
                              setIsError(false);
                              dispatch(setMaxPriceFilter(e.target.value));
                           } else {
                              setIsError(true);
                           }
                        }}
                     />
                  </Form.Group>
                  {isError && (
                     <p className="text-danger">Please enter a number</p>
                  )}
               </Form>
            </div>
         </div>
      </div>
   );
   function TypeItem({ title, name }) {
      return (
         // eslint-disable-next-line jsx-a11y/anchor-is-valid
         <a
            onClick={(e) => {
               typeHandler(e);
            }}
            className="mb-2 text-lead fw-lighter activeAside"
            name={name}
         >
            {title}
         </a>
      );
   }
   function CategoryItem({ title, name }) {
      return (
         // eslint-disable-next-line jsx-a11y/anchor-is-valid
         <a
            className={"mb-2 text-lead fw-lighter  activeAside"}
            onClick={(e) => {
               categoriesHandler(e);
            }}
            name={name}
         >
            {title}
         </a>
      );
   }
}
