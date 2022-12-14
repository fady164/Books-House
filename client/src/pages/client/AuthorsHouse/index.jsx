import React, { useState } from "react";
import "./authorshouse.css";
import Pricing from "../Home/Package";
import { useEffect } from "react";
import "../../../assets/css/Home.css";
import { useGetHomepageDataQuery } from "../../../features/homeApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { homepageActions } from "../../../store/client/reducers/homepageSlice";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "react-bootstrap";
import Modalnew from "../../../components/client/form-modal/Modal";
import AuthorForm from "../../../components/client/author-form/AuthorForm";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../components/client/ChecoutForm/CheckoutForm";
import { motion } from "framer-motion";
import ConfettiModal from "../../../components/client/ui/ConfettiModel";

const container = {
  show: {
    transition: {
      staggerChildren: 0.6,
    },
  },
};
const item = {
  hidden: { opacity: 0, y: 200 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: "easeInOut",
      duration: 1,
    },
  },
};

export default function AuthorsHouse() {
  const { data, isError, isLoading } = useGetHomepageDataQuery();
  const dispatch = useDispatch();
  const { setDataInLocalState } = homepageActions;
  const { wallOfFamesData, feedbackData, packagesData } = useSelector(
    (state) => state.homepage
  );
  useEffect(() => {
    if (data) {
      dispatch(setDataInLocalState(data));
    }
  }, [dispatch, data]);

  // stripe code and forms
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("form");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [windowDimensions] = useState({
    width: window.innerWidth,
    height: 2200,
  });
  const [confetti, setConfetti] = useState(false);

  const [packages, setPackages] = useState(null);
  const handlePay = () => setActive("pay");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("/config").then(async (r) => {
      const { publishableKey } = await r.data;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    if (packages !== null) {
      axios.post("/create-payment-intent", packages).then(async (result) => {
        var { clientSecret } = await result.data;
        setClientSecret(clientSecret);
      });
    }
  }, [packages, confetti]);

   return (
      <div className="starting__page w-100 d-flex flex-column justify-content-center align-items-center">
         {/* <ConfettiModal size={windowDimensions} /> */}
         {confetti === true && <ConfettiModal size={windowDimensions} />}

      {/* <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm packages={packages} />
      </Elements> */}
         <Modalnew show={show} handleClose={handleClose} packages={packages}>
            {active === "form" && (
               <AuthorForm active={active} handlePay={handlePay} />
            )}
            {clientSecret && stripePromise && active === "pay" && (
               <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm packages={packages} confetti={setConfetti} />
               </Elements>
            )}
         </Modalnew>
         {/* SERVICE NAME AND DESCRIPTION */}
         <div className="mb-5">
            <div className="container">
               <div className="row d-flex flex-column justify-content-center align-items-center">
                  <motion.div
                     className="col-6 d-flex flex-column justify-content-center align-items-center  mb-5"
                     variants={container}
                     initial="hidden"
                     animate="show"
                     exit="exit"
                     transition={{ staggerChildren: 0.5 }}
                     whileInView={"show"}
                     viewport={{ once: false, amount: 0.4 }}
                  >
                     <motion.h1 className="mb-3" variants={item}>
                        Authors House
                     </motion.h1>
                     <motion.p variants={item}>
                        You’re in the right place.No matter how you publish your
                        book Give us your book and we will provide you with real
                        reviews about your book
                     </motion.p>
                     <div>
                        <motion.a
                           className="packages-btn px-4 btn btn-outline-dark rounded-0"
                           variants={item}
                           href="#packages-Section"
                        >
                           Packages
                        </motion.a>
                     </div>
                  </motion.div>
               </div>

          {/* OUR SERVIECS GALLERY */}
          <motion.div
            className="gallery mb-5"
            variants={container}
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.5 }}
            exit="exit"
          >
            <motion.h2 variants={item} className="text-center my-5">
              Our Services Gallery
            </motion.h2>
            <motion.div
              className="row container mx-auto"
              variants={container}
              initial="hidden"
              animate="show"
              //whileInView={"show"}
              //viewport={{ once: false, amount: 0.4 }}
              transition={{ staggerChildren: 0.5 }}
              exit="exit"
            >
              <div className="col-8 row">
                <div className="col-6">
                  <motion.img
                    className="col-12 py-2"
                    src="./images/hero_1.jpg"
                    alt=""
                    variants={item}
                  />
                </div>
                <div className="col-6 py-2">
                  <motion.img
                    className="col-12"
                    src="./images/hero_2.jpg"
                    alt=""
                    variants={item}
                  />
                </div>
                <div className="col-12 py-2">
                  <motion.img
                    className="col-12"
                    src="./images/hero_3.jpg"
                    alt=""
                    variants={item}
                  />
                </div>
              </div>
              <div className="col-4 py-2">
                <motion.img
                  className="w-100 h-100  "
                  src="./images/hero_2.jpg"
                  alt=""
                  variants={item}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* PACKAGES */}
          <div id="packages-Section">
            <Pricing
              pricingArray={packagesData}
              handleShow={handleShow}
              setPackages={setPackages}
              variants={item}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
