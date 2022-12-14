import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import AuthorForm from "../../../components/client/author-form/AuthorForm";
import CheckoutForm from "../../../components/client/ChecoutForm/CheckoutForm";
import Modalnew from "../../../components/client/form-modal/Modal";
import ConfettiModal from "../../../components/client/ui/ConfettiModel";
import ReviewHeader from "../../../components/client/ui/ReviewHeader/ReviewHeader";
import axios from "axios";
import MyModal from "../../admin/calender/MyModal";

export default function Service() {
  // const [show, setShow] = useState(false);
  const [active, setActive] = useState("form");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [packages, setPackages] = useState({
    id: 1,
    name: "package1",
    price: 70,
  });
  const [windowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [confetti, setConfetti] = useState(false);
  // const { authorData } = useSelector((state) => state.author);
  const data = {
    src: "https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    header: "Test Title",
    desc: "The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element",
  };

  const handlePay = () => setActive("pay");
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("/config").then(async (r) => {
      const { publishableKey } = await r.data;
      console.log(publishableKey);
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    axios.post("/create-payment-intent", packages).then(async (result) => {
      var { clientSecret } = await result.data;
      console.log(clientSecret);
      setClientSecret(clientSecret);
    });
  }, [packages]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>
      <MyModal show={show} handleClose={handleClose} />
      {/* {confetti === true && <ConfettiModal size={windowDimensions} />}
      {/* <ConfettiModal /> */}
      <Button variant="primary" onClick={handleShow}>
        Model
      </Button>
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
      {/* <ReviewHeader data={data} className="mt-5 pt-5" />  */}
    </div>
  );
}
