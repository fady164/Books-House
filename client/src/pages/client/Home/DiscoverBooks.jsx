import React from "react";
import DiscoverBooksSwiper from "../../../components/client/ui/swiper/DiscoverBooksSwiper";
// import Swiper from "swiper";

export default function DiscoverBooks() {
  return (
      <div className="container">
        <section className="section bg-white">
          <div className="row d-flex justify-content-center">
            <div className="menu-content pb-70 col-lg-8 mb-4">
              <div className="title text-center">
                <h1 className="fw-semibold">What will we discover ?</h1>
                <p className="text-muted text-sm text-dark">
                Reading fires up your imagination and stimulates the memory centers of your mind
                </p>
              </div>
            </div>
          </div>
          <DiscoverBooksSwiper />
        </section>
      </div>
  );
}
