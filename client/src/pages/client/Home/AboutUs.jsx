import React from "react";
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

const AboutUs = () => {
   return (
      <div className="container">
         <motion.div
            className="row"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ staggerChildren: 0.5 }}
            //whileInView={"show"}
            //viewport={{ once: false, amount: 0.4 }}
         >
            <motion.div className="col-md-6 col-sm-12">
               <motion.img
                  variants={item}
                  src="./images/4185.jpg"
                  className="homeAbout__img w-75 h-75"
               />
            </motion.div>
            <motion.div
               className="home__about col-md-6 col-sm-12 mt-2 pt-5 "
               variants={container}
               initial="hidden"
               //animate="show"
               // exit="exit"
               transition={{ staggerChildren: 0.5 }}
               whileInView={"show"}
               viewport={{ once: true, amount: 0.6 }}
            >
               <motion.h5 className="fw-bold mb-4  mt-3" variants={item}>
                  Who We Are ?
               </motion.h5>
               <motion.p className="text-muted" variants={item}>
                  Bookshouse realizes the importance of ink and paper which is
                  why we aim at freeing them. We know that self-publishing can
                  be risky and that publishing houses don’t always prefer the
                  risk, either. That’s why, in Bookshouse, our mission is to
                  help every author get a chance at recognition, not only by
                  displaying the book in our store but also by providing
                  detailed and honest reviews of the book to encourage readers
                  to put their trust in lesser-known books. Bookshouse also
                  helps you get hold of the books you love at the touch of a
                  screen and find your next favorite book among thousands of
                  books worldwide.
               </motion.p>
            </motion.div>
         </motion.div>
      </div>
   );
};

export default AboutUs;
