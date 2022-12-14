import React from "react";
import "./wishlistSideBar.css";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import WishlistItem from "../../../components/client/ui/WishlistItem";
import { useDispatch, useSelector } from "react-redux";
import { clearWish } from "../../../store/client/reducers/wishlistSlice";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: { x: "100vw", opacity: 0 },
  visible: { x: "0", opacity: 1, transition: { delay: 0.5 } },
};

export default function WishlistSideBar({ hideModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlistItems } = useSelector((state) => state.WishList);
  console.log(wishlistItems);
  const ClearWish = () => {
    dispatch(clearWish());
    hideModal();
  };
  const goCart = () => {
    navigate("/cart");
    hideModal();
  };
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="backdrop"
        variants={backdrop}
        animate="visible"
        initial="hidden"
        exit="hidden"
        onClick={hideModal}
      ></motion.div>
      <motion.div
        variants={modal}
        className="sidebarmodal"
        initial="hidden"
        animate="visible"
      >
        <div className="d-flex flex-column align-items-start">
          <div onClick={hideModal} className="mb-4 mt-3">
            <a className="fs-5  fw-bold ">
              <AiOutlineClose />
            </a>
          </div>
          {wishlistItems?.map((item, index) => (
            <WishlistItem hideModal={hideModal} data={item} key={index}/>
          ))}
        </div>
        <div>
          <div>
            <div
              className="btn btn-outline-dark rounded mt-5"
              onClick={ClearWish}
            >
              Clear Wishlist
            </div>
          </div>
          <div>
            <div onClick={goCart} className="btn btn-outline-dark rounded mt-5">
              Shop Cart
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
