import React from "react";
import ClientsTestmonialsSwiper from "../../../components/client/ui/swiper/ClientsTestimonials";

export default function ClientsTestimonials({ clientsTestimonialsArray }) {
  
  return (
    <div className="container">
      <section className="section bg-white">
        <div className="row d-flex justify-content-center">
          <div className="menu-content pb-70 col-lg-8 mb-4">
            <div className="title text-center">
              <h1 className="fw-semibold">Client’s Testmonials</h1>
              <p className="text-muted text-sm">
              3,000+ successful authors & publishers use us , Join a growing community of happy authors
              </p>
            </div>
          </div>
        </div>
        <ClientsTestmonialsSwiper
          clientsTestimonialsArray={clientsTestimonialsArray}
        />
      </section>
    </div>
  );
}
