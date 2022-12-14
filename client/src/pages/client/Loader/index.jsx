import React from "react";
import { motion } from "framer-motion";
import "./loader.css";
// Import images

const container = {
   show: {
      transition: {
         staggerChildren: 0.35,
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
         duration: 1.6,
      },
   },
   exit: {
      opacity: 0,
      y: -200,
      transition: {
         ease: "easeInOut",
         duration: 0.8,
      },
   },
};

const itemMain = {
   hidden: { opacity: 0, y: 200 },
   show: {
      opacity: 1,
      y: 0,
      transition: {
         ease: [0.6, 0.01, -0.05, 0.95],
         duration: 1.6,
      },
   },
};

const Loader = ({ setLoading }) => {
   return (
      <motion.div className="loader">
         <motion.div
            variants={container}
            // onAnimationComplete={() => setLoading(false)}
            initial="hidden"
            animate="show"
            exit="exit"
            className="loader-inner"
         >
            <motion.div className="mainImage">
               <motion.img src="./images/hero_2.jpg" />
            </motion.div>
         </motion.div>
      </motion.div>
   );
};

export default Loader;
