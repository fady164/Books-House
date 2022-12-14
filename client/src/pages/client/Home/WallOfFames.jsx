import React from "react";
import WallOfFamesSwiper from "../../../components/client/ui/swiper/WallOfFamesSwiper";

const WallOfFames = ({ wallOfFamesArray }) => {
  return (
    <div className="container">
      <section id="pricing" className="section bg-white">
        <div className="row d-flex justify-content-center">
          <div className="menu-content col-lg-8 mb-4">
            <div className="title text-center">
              <h1 className="fw-semibold">Wall Of Fame</h1>
              <p className="text-muted text-sm">
                Success isn’t Always about Greatness. It’s about Consistency
              </p>
            </div>
          </div>
        </div>
        <WallOfFamesSwiper wallOfFamesArray={wallOfFamesArray} />
      </section>
    </div>
  );
};

export default WallOfFames;
