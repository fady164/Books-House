import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/client/reducers/cartSlice";
import { removeFromWish } from "../../../store/client/reducers/wishlistSlice";

export default function WishlistItem({ hideModal, data }) {
  const dispatch = useDispatch();
  const removefromWish = (book) => {
    dispatch(removeFromWish(book));
  };

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  return (
    <div className="row mb-3">
      <div className="col-4">
        <img className="col-12" src={data.imageSource} alt="" />
      </div>
      <div className="col-6 d-flex flex-column justify-content-around align-items-start">
        <h5>{data.title}</h5>
        <p className="m-0">
          Price: <span className="fw-normal">${data.price}</span>
        </p>
      </div>
      <div className="col-2 d-flex flex-column justify-content-around ">
        <div
          className="m-0"
          onClick={() => {
            removefromWish(data);
          }}
        >
          <AiOutlineClose />
        </div>
        <div>
          <div
            className=""
            onClick={() => {
              handleAddToCart(data);
            }}
          >
            <IoBagHandleOutline />
          </div>
        </div>
      </div>
    </div>
  );
}
