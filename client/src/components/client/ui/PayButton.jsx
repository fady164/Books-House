import axios from "axios";
import "../../../assets/css/PayButton.css";
// import { useSelector } from "react-redux";
// import { url } from "../slices/api";

const PayButton = ({ cartItems }) => {
  //   const data = cartItems.forEach((object) => {
  //     delete object["BookDesc"];
  //   });
  const data = cartItems.map(
    ({
      bookDesc,
      author,
      type,
      category,
      updatedAt,
      ourChoise,
      comments,
      ...rest
    }) => {
      return rest;
    }
  );

  // console.log(data);
  const handleCheckout = () => {
    axios
      .post("/create-checkout-session", { data })
      .then((response) => {
        if (response.data.url) {
          // console.log(response);
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button
        className="btn w-100 bg-button fs-5"
        onClick={() => handleCheckout()}
      >
        Check out
      </button>
    </>
  );
};

export default PayButton;
