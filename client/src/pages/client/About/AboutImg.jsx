import React from "react";
import "../../../assets/css/About.css";
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
const AboutImg = () => {
  return (
    <div >
      <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      transition={{ staggerChildren: 0.5 }}
      className="aboutimgParent d-flex justify-content-center mt-5">
        <motion.img
        variants={item}
          className="about__img"
          src="./images/logo2.png"
        />
      </motion.div>
    </div>
  );
};

export default AboutImg;
