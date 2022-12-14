import React from "react";
import "../../../assets/css/About.css";
import BreadCrumb from "../../../components/client/ui/Breadcrump/BreadCrumb";
import AboutImg from "./AboutImg";
import AboutTeam from "./AboutTeam";
import AboutUs from "./AboutUs";
import OurGoals from "./OurGoals";

const index = () => {
  return (
    <div>
      {/* <BreadCrumb title="About" breadCrumb="About" /> */}
      <div className="container">
        <div className="row">
          <div className="col-6 my-5"><AboutUs /></div>
          <div className="col-6"><AboutImg/></div>
        </div>
        {/* <AboutImg /> */}
        {/* <OurGoals /> */}
        <AboutTeam/>
      </div>
    </div>
  );
};

export default index;
