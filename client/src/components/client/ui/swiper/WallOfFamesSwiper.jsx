import React from "react";
import { Navigation, Pagination, A11y , FreeMode , Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperData from "./SwiperData"
import 'swiper'
import "swiper/css/bundle";


export default function WallOfFamesSwiper({wallOfFamesArray}) {
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y , FreeMode , Autoplay]}
        spaceBetween={100}
        slidesPerView={1}
        loop={true}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        className="container shadow fames__swiper"
        navigation
        freeMode
        a11y
      >
         {/* Mapping wall of fames */}
       
    {wallOfFamesArray.map((item , index)=>{
      return <SwiperSlide className=" text-dark swiper__card" key={index}>
     <SwiperData
            feedTitle={item.feedTitle}
            feedPosition={item.feedPosition}
            imgSrc={item.imgSrc}
            className="my-5"
          >
            {item.paragraph}
          </SwiperData>
      </SwiperSlide>
    })}
      </Swiper>
    </div>
  );
}
