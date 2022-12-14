/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./ItemCard.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  addToWish,
  removeFromWish,
} from "../../../store/client/reducers/wishlistSlice";
import { addToCart } from "../../../store/client/reducers/cartSlice";

const container = {
  hidden: { opacity: 0 },
  show: {
    y: -150,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.6,
      delay: 0.1,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1.3,
    },
  },
};

export default function ItemCard({ book }) {
   const token = useSelector((state) => state.userState.token);

   const navigate = useNavigate();
   const dispatch = useDispatch();

  const detailsOfBook = () => {
    navigate(`/bookdetails/${book._id}`);
  };
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const [showbtns, setShowbtns] = useState(false);
  const [wishlistIcon, setWishlistIcon] = useState(false);
  const { wishlistItems } = useSelector((state) => state.WishList);
  const addToWishlist = () => {
    if (wishlistIcon === false) {
      setWishlistIcon(true);
      dispatch(addToWish(book));
    } else {
      dispatch(removeFromWish(book));
      setWishlistIcon(false);
    }
  };
  const detailPage = () => {
    navigate(`/bookdetails/${book._id}`);
  };

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0, delay: 0.9 }}
      transition={{ duration: 0.9, type: "spring" }}
    >
      <motion.div
        onHoverStart={() => {
          setShowbtns(true);
        }}
        onHoverEnd={() => {
          setShowbtns(false);
        }}
        className="imgparentt"
        id="imgOne"
      >
        <img src={book.imageSource} alt="" className="col-12" />

            {showbtns && token && (
               <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="btnsCont d-flex justify-content-center align-items-center"
               >
                  <motion.button
                     className="itemBtns btn btn-light mx-1 rounded-5"
                     type="submit"
                     variants={item}
                     onClick={detailPage}
                  >
                     <AiOutlinePlus />
                  </motion.button>
                  
                  <motion.button
                     className="itemBtns btn btn-light mx-1 text-bold rounded-5"
                     type="submit"
                     variants={item}
                     onClick={() => handleAddToCart(book)}
                  >
                     <IoBagHandleOutline />
                  </motion.button>
                  <motion.button
                     className="itemBtns btn btn-light mx-1 rounded-5"
                     type="submit"
                     variants={item}
                     onClick={addToWishlist}
                  >
                    {wishlistIcon ? <AiFillHeart /> : <AiOutlineHeart />}
                  </motion.button>
               </motion.div>
            )}
            <div className="blackBG"></div>
         </motion.div>
         <div className="textitem mt-3">
            <div className="">
               <a
                  onClick={detailsOfBook}
                  className=" textlink fw-bold textitem"
                  href="#"
               >
                  {book.title}
               </a>
            </div>
            <span className="textitem mb-1">
               By <a className="authorName">{book.author}</a>{" "}
            </span>
            <p className="textitem ">${book.price}.00</p>
         </div>
      </motion.div>
   );
}
