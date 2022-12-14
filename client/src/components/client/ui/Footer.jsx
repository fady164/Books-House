import React from "react";
import "../../../assets/css/Footer.css";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo2 from "../../../assets/images/logo2.png"
import {
   AiFillGithub,
   AiFillHome,
   AiFillLinkedin,
   AiOutlineGoogle,
   AiOutlineTwitter,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
   const year = new Date().getFullYear();
   return (
      <footer className="footer book-footer bg-dark">
         {/* <div className="book__wave">
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
      </div> */}
         <Container className="text-light">
            <Row>
               <Col md="6" lg="3" className="pt-md-2 ps-0 mt-sm-5">
                  <div className="logo ">
                     <img
                        src={logo2}
                        className="mt-1"
                        alt="logo"
                     />
                     <div>
                        <h5 className="text-light mt-2">BooksHouse</h5>
                     </div>
                  </div>
                  <p className="footer__text mt-3 pe-3 col-10 text-white-50">
                     realizes the importance of ink and paper which is why we
                     aim at freeing them.
                  </p>
               </Col>
               <Col md="6" lg="3" className="pt-md-4 mt-sm-5">
                  <div className="footer__quick-links ">
                     <h6 className="quick__links-title">Explore</h6>
                     <ListGroup className="mb-3">
                        <ListGroupItem className="ps-0 border-0  bg-transparent">
                           <Link to="authorshouse" className="text-white-50">
                              Authors House
                           </Link>
                        </ListGroupItem>
                        <ListGroupItem className="ps-0 border-0 bg-transparent">
                           <Link to="booksshop" className="text-white-50">
                              Books
                           </Link>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0  bg-transparent">
                           <Link to="reviews" className="text-white-50">
                              Reviews
                           </Link>
                        </ListGroupItem>
                     </ListGroup>
                  </div>
               </Col>
               <Col md="6" lg="3" className="pt-md-4 mt-sm-5">
                  <div className="footer__quick-links">
                     <h6 className="quick__links-title">Company</h6>
                     <ListGroup className="mb-3">
                        <ListGroupItem className="ps-0 border-0  bg-transparent">
                           <Link to="about" className="text-white-50">
                              About Us
                           </Link>
                        </ListGroupItem>
                        <ListGroupItem className="ps-0 border-0  bg-transparent">
                           <Link to="#" className="text-white-50">
                              Careers
                           </Link>
                        </ListGroupItem>
                        <ListGroupItem className="ps-0 border-0  bg-transparent">
                           <Link to="#" className="text-white-50">
                              Terms
                           </Link>
                        </ListGroupItem>
                        <ListGroupItem className="ps-0 border-0  bg-transparent">
                           <Link to="#" className="text-white-50">
                              Privacy
                           </Link>
                        </ListGroupItem>
                        <ListGroupItem className="ps-0 border-0  bg-transparent">
                           <Link to="#" className="text-white-50">
                              Help
                           </Link>
                        </ListGroupItem>
                     </ListGroup>
                  </div>
               </Col>
               <Col md="6" lg="3" className="pt-md-4 mt-sm-5">
                  <div className="footer__quick-links">
                     <h6 className="quick__links-title">Contact</h6>
                     <ListGroup className="footer__contact">
                        <ListGroupItem className="ps-0 border-0  gap-2  bg-transparent">
                           <span>
                              <i className="ri-map-pin-line"></i>
                           </span>
                           <p className="text-white-50">
                              <AiFillHome className="fs-5" /> 123 Snan st ,
                              Heliopolis-Cairo
                           </p>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0  gap-2  bg-transparent">
                           <span>
                              <i className="ri-mail-line"></i>
                           </span>
                           <p className="text-white-50">
                              <MdEmail className="fs-5" /> bookshouse@gmail.com
                           </p>
                        </ListGroupItem>
                        <ListGroupItem className="ps-0 border-0  gap-2  bg-transparent">
                           <span>
                              <i className="ri-phone-line"></i>
                           </span>
                           <p className="text-white-50">
                              <BsTelephoneFill className="fs-5 me-2" />
                              +20 01013898149
                           </p>
                        </ListGroupItem>
                     </ListGroup>
                  </div>
               </Col>

               <Col lg="12">
                  <p className="footer__copyright">
                     Copyright {year} developed by DevTeam . All rights
                     reserved.
                  </p>
               </Col>
               <Col lg="12">
                  <div className="d-flex justify-content-center pt-2 ">
                     <a href="" className="me-4 text-reset">
                        <FaFacebookF />
                     </a>
                     <a href="" className="me-4 text-reset">
                        <AiOutlineTwitter />
                     </a>
                     <a href="" className="me-4 text-reset">
                        <AiOutlineGoogle />
                     </a>
                     <a href="" className="me-4 text-reset">
                        <AiFillLinkedin />
                     </a>
                     <a href="" className="me-4 text-reset">
                        <AiFillGithub />
                     </a>
                  </div>
               </Col>
            </Row>
         </Container>
      </footer>
   );
};

export default Footer;
