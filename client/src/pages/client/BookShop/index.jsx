import React from "react";
import BookList from "./BookList";
import "../../../assets/css/BookShop.css";
import BreadCrumb from "../../../components/client/ui/Breadcrump/BreadCrumb";
import Aside from "../../../components/client/Aside/Aside";
import { motion } from "framer-motion";

const container = {
   show: {
      transition: {
         staggerChildren: 0.6,
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
         duration: 1.5,
      },
   },
   exit: {
      opacity: 0,
      y: -200,
      transition: {
         ease: "easeInOut",
         duration: 0.75,
      },
   },
};
export default function BooksShop() {
  return (
    <motion.div 
    className="mb-5 starting__page"
    variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ staggerChildren: 0.5 }}>
      <div className="  mx-auto">
        <div>
          {/* <BreadCrumb title="product" breadCrumb="shop" /> */}
        </div>
      </div>
      <motion.div 
      className="container"
      variants={item}>
        <motion.div 
        className="row  my-5 mx-auto"
        variants={item}>
          <motion.div 
          className="col-md-3 mb-3"
          variants={item}>
            <Aside />
          </motion.div>
          <div className="col-md-9">
            <BookList />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
