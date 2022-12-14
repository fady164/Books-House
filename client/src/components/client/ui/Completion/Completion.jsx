import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  getTotals,
} from "../../../../store/client/reducers/cartSlice";

import ConfettiModal from "../ConfettiModel";
import "./Completion.css";

export default function Completion() {
  const dispatch = useDispatch();
  const [confetti, setConfetti] = useState(true);
  const cart = useSelector((state) => state.cart);
  const [windowDimensions] = useState({
    width: window.innerWidth - 10,
    height: window.innerHeight,
  });

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
    const timer = setTimeout(() => {
      setConfetti(false);
    }, 10000);
  }, [cart, dispatch]);

  return (
    <div className="container">
      {confetti === true && <ConfettiModal size={windowDimensions} />}
      <div className=" mt-5 mb-5 pt-5 pb-5">
        <div className="mt-5 mb-5 pt-5 pb-5 shadow rounded">
          <div className="box">
            <div className="success alert">
              <div className="alert-body">Success !</div>
            </div>
          </div>
          <div className="text-center">
            <h2>Checkout Successful</h2>
            <p>Your order might take some time to process.</p>
            <p>Check your order status at your profile after about 10mins.</p>
            <p>
              Incase of any inqueries contact the support at{" "}
              <strong>support@BookHouse.com</strong>
            </p>
            <Link to="/" className="btn btn-outline-success">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
