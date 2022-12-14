import React, { useEffect } from "react";
import { Navigation, Pagination, A11y, FreeMode, Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper";
import "swiper/css/bundle";
import ItemCard from "../../ItemCard/ItemCard";
import BookList from "../../../../pages/client/BookShop/BookList";
import { getBooks } from "../../../../store/client/reducers/bookSlice";

const WhatWillWeDiscoverSwiper = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[A11y, FreeMode, Autoplay, Navigation]}
        spaceBetween={100}
        centeredSlides={false}
        loop={true}
        slidesPerView={4}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="container"
        freeMode
        a11y
        navigation
        breakpoints={{
          // when window width is >= 200px
          200: {
            slidesPerView: 1,
          },
          // when window width is >= 600px
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 900px
          900: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 1000px
          1000: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {/* <Mapping Discover Books/> */}

        {books.map((book, index) => (
          <SwiperSlide className="bg-light text-dark " key={index}>
            <ItemCard
              className="m-3 p-4 col d-flex w-100"
              book={book}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WhatWillWeDiscoverSwiper;