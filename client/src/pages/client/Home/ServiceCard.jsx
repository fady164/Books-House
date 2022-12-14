import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ServiceCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="package__item col-lg col-md-12 mb-sm-5">
      <div className="package__details">
        <div className="package__header mb-5">
          <img className="demo-bg" src="./images/book1.jpg" />
          <div className="demo-content">
            <h3 className="fw-bold">{item.title}</h3>
          </div>
        </div>
        <div className="mx-4 mb-5">
          <p>{item.desc}</p>
          <div className="package__control d-flex flex-column align-items-center">
            <button
              className="btn btn-warning mt-4 rounded-pill "
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(`${item.path}`);
              }}
            >
              {" "}
              <Link to={item.path}></Link>
              {item.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
