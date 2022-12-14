import React from "react";
import { Navigation, Pagination, A11y, FreeMode, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "swiper/css/effect-fade";
import "swiper";
import "swiper/css/bundle";

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
      duration: 4,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 2,
    },
  },
};



const HeaderSwiper = ({ headerArray }) => {
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[A11y, FreeMode, Autoplay]}
        spaceBetween={100}
        centeredSlides={true}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="container h-100"
        
        freeMode
        a11y
      >
        
        <SwiperSlide className="h-100 d-flex align-items-center justify-content-center mt-5 flex-column">
          <h1 className="m-5 fw-bold">BooksHouse</h1>
          <h5 className="m-5 fw-bold">Get you book reviewed</h5>
        </SwiperSlide>
        <SwiperSlide style={{padding:"0px 20%"}}>
          <h1 className="fw-bold pb-3 text-center">BooksHouse</h1>
  <p className="pb-5 fs-5"><b>Bookshouse</b> is definitely the best place to help you start filling your shelves with all the books you love!
In <b>Bookshouse</b>, we believe in the power of a single book which is why we have made the process of navigating through thousands of books as easy as a scroll of a finger!
( <b>Bookshouse</b> provides thousands of books worldwide at the scroll of your finger! )</p>
</SwiperSlide>
        {/* <Mapping header data/> */}
        {headerArray.map((item, index) => {
          return (
            <SwiperSlide className="bg-transparent" key={index}  style={{padding:"0px 20%"}}>
              <div className="hero__content">
                <h2 className="hero__subtitle mb-5 fw-bold">Our Services</h2>
                <h4 className="pb-5">{item.title}</h4>
                <p className="pb-5">{item.desc}</p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="buy__btn mb-5 btn btn-warning"
                >
                  <Link to={item.path}>{item.btn}</Link>
                </motion.button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeaderSwiper;
