import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function Contactus() {
  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="mr-auto">
            <div className="col-md-12  ">
              <h2 className="text-center fs-1 my-5 pb-4">Contact Us</h2>
              <div className="">
                <p className="my-5 fs-5 text-muted ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
                  quaerat autem corrupti asperiores accusantium et fuga! Facere
                  excepturi, quo eos, nobis doloremque dolor labore expedita
                  illum iusto, aut repellat fuga!,Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Iste quaerat autem corrupti
                  asperiores accusantium et fuga! Facere excepturi, quo eos,
                  nobis doloremque dolor labore expedita illum iusto, aut
                  repellat fuga!aut repellat fuga!
                </p>
              </div>
            </div>
            <div className="col-md-12 py-5  mb-5">
              <div className="d-flex justify-content-center fs-4 mb-5">
                <ul className="list-unstyled pl-md-5 mb-5">
                  <li className=" text-black mb-2">
                    <span className="mr-3">
                      <FontAwesomeIcon
                        className="text-dark fs-5 mx-3"
                        icon={faMapLocationDot}
                      />
                    </span>{" "}
                    34 Street Name, City Name Here, United States
                  </li>
                  <li className=" text-black mb-2">
                    <span className="mr-3">
                      <FontAwesomeIcon
                        className="text-dark fs-5 mx-3"
                        icon={faPhone}
                      />
                    </span>{" "}
                    +1 (222) 345 6789
                  </li>
                  <li className=" text-black">
                    <span className="mr-3">
                      <FontAwesomeIcon
                        className="text-dark fs-5 mx-3"
                        icon={faEnvelope}
                      />
                    </span>{" "}
                    info@mywebsite.com{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
