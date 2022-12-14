import React from "react";
import { Navigation, Pagination, A11y, FreeMode, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperData from "./SwiperData";
import "swiper/css/effect-fade";
import "swiper";
import "swiper/css/bundle";


export default function ClientsTestmonialsSwiper({clientsTestimonialsArray}) {
  
  // const feedbacksList = "s";
  return (
    <div>
      <Swiper
         // install Swiper modules
         modules={[Navigation, Pagination, A11y , FreeMode , Autoplay ]}
        spaceBetween={100}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        className="container"
        navigation
        freeMode
        a11y
        breakpoints={{
          // when window width is >= 200px
          200: {
            slidesPerView: 1,
          },
          // when window width is >= 900px
          900: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
        }}
      >
        {/* <Mapping Clients testmonials/> */}

{clientsTestimonialsArray.map((item , index)=>


              <SwiperSlide 
              key={index}
              className={` swiper__card h-auto ${index%2===0? "testimonial__primary" : "testimonial__warning"}`}
              >
          <div className="custom-shape-divider-top-1668530886">
        <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
                  className="shape-fill"
                ></path>
              </svg> 
              </div>
          <SwiperData className="100% mt-5"
            feedTitle={item.title}
            feedPosition={item.desc}
            imgSrc={item.img}
          >
              <p>{item.paragraph}</p>
          </SwiperData>
          <div className="custom-shape-divider-bottom-1668531089 w-100">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z"
                  className="shape-fill"
                ></path>
              </svg>
            </div> 
        </SwiperSlide>
        )}
        
      </Swiper>
    </div>
  );
}