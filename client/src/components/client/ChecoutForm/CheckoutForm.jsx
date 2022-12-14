import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import "../../../assets/css/CheckoutForm.css";
import FullScreenLoader from "../../FullScreenLoader";
import Spinner from "../../Spinner";

export default function CheckoutForm({ packages, confetti }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { authorData } = useSelector((state) => state.author);
  // const [credentials, setCredentials] = useState({
  //   fullName: "",
  //   phoneNumbar: "",
  //   email: "",
  //   address: "",
  // });
  // const handleChange = (e) => {
  //   const { value, name } = e.target;
  //   setCredentials({ ...credentials, [name]: value });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    axios.post("/data", [{ packages }, { authorData }]).then(async (result) => {
      var data = await result.data;
    });

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      confetti(true);
      setTimeout(() => {
        confetti(false);
      }, 10000);
      setMessage("Payment status: " + paymentIntent.status);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };
  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => setSpinner(false), 2000);
  }, []);

  return (
    <div>
      <h1 className="text-center fs-3">Pay Here</h1>
      <Form id="payment-form" onSubmit={handleSubmit}>
        {/* <Form.Group className="mb-3" controlId="formFullname">
          <Form.Label>Full Name </Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={authorData.firstName + " " + authorData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number </Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={authorData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={authorData.authorEmail}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            onChange={handleChange}
            placeholder="Enter Address"
            required
          />
        </Form.Group> */}
        <div className="mb-3 my-5">
          {spinner && <Spinner />}
          <PaymentElement id="payment-element" className="mb-3 my-5" />
        </div>

        {message && (
          <div
            id="payment-message"
            className="p-3 mb-2 bg-warning text-dark text-center rounded"
          >
            {message}
          </div>
        )}
        <div className="d-flex justify-content-center">
          <button
            className="btn bg-button w-50 mt-5"
            disabled={isProcessing || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </button>
        </div>
      </Form>
    </div>
  );
}
