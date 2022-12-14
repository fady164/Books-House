import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaApple, FaLock, FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";
import "./Login.css";

export default function FargotPass() {
  //The state of the error message
  const [passErrMsg, setPassErrMessage] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  // The state of the button to be abled or disapled according to the validation
  const [isDisabled, setDisabled] = useState(true);
  // for displaying the error message if the input is invalid
  const [displayEmailErrorMsg, setDisplayEmailErrorMsg] = useState(false);
  const [displayPassErrorMsg, setDisplayPassErrorMsg] = useState(false);
  // npm validator to validate the password
  const navigate = useNavigate();

  const validateEmail = (value) => {
    if (validator.isEmpty(value)) {
      // if the email or username is empty
      setEmailErrMsg("Email is required");
      setDisabled(true);
    }
    if (validator.isEmail(value)) {
      // if the email or username is valid
      setEmailErrMsg("Accepted Email ✔");
      setDisabled(false);
    } else {
      // if the email or username is invalid
      setEmailErrMsg("Please enter a valid Email!");
      setDisabled(true);
    }
  };
  const validatePass = (value) => {
    if (validator.isEmpty(value)) {
      // if the email or username is empty
      setPassErrMessage("Password is required");
      setDisabled(true);
    }
    if (validator.isStrongPassword(value)) {
      // if the email or username is valid
      setPassErrMessage("Strong Password ✔");
      setDisabled(false);
    } else {
      // if the email or username is invalid
      setPassErrMessage(
        "Password should contain at least 8 characters with 1 special 1 uppercase 1 lowercase and 1 numeric!"
      );
      setDisabled(true);
    }
  };
  // function changes the state of displaying the error message
  const onDisplayErrorMsg = (e) => {
    console.log(e.target.value);
    if (e.target.name == "password") {
      setDisplayPassErrorMsg(true);
    } else if (e.target.name == "password2") {
      setDisplayEmailErrorMsg(true);
    }
  };
  const handleSubmit = async (e) => {
    e.prevent.default();
    navigate("/home");
  };
  const signupHandler = () => {
    navigate("/auth/signup");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="main">
        <div className="centeredElement">
          <div className="auth">
            <h5 className="my-5">Log in to Bookshouse</h5>

            <div className="mb-5">
              {/* if the user clicked outside the input the status of the error message will appear */}
              <InputGroup className="userInput mb-2" onBlur={onDisplayErrorMsg}>
                {/* password icon */}
                <InputGroup.Text id="basic-addon">
                  <FaLock />
                </InputGroup.Text>
                {/* Password input */}
                <Form.Control
                  type="password"
                  name="password"
                  onChange={(e) => validatePass(e.target.value)}
                  aria-label="Password Input"
                  placeholder="Password"
                  style={{
                    borderLeft:
                      passErrMsg === "Strong Password ✔"
                        ? "4px solid green"
                        : passErrMsg === ""
                        ? "none"
                        : "5px solid red",
                    boxShadow: "none",
                  }}
                />
              </InputGroup>
              {/* for displaying the status of the input */}
              {displayPassErrorMsg && (
                <Form.Text
                  className="errorMsg text-small float-start fw-semibold"
                  style={{
                    color:
                      passErrMsg === "Strong Password ✔" ? "green" : "#d21313",
                  }}
                >
                  {passErrMsg}
                </Form.Text>
              )}
            </div>
            <div className="mb-5">
              {/* if the user clicked outside the input the status of the error message will appear */}
              <InputGroup className="userInput mb-2" onBlur={onDisplayErrorMsg}>
                {/* password icon */}
                <InputGroup.Text id="basic-addon2">
                  <FaLock />
                </InputGroup.Text>
                {/* Password input */}
                <Form.Control
                  type="password"
                  name="password2"
                  onChange={(e) => validatePass(e.target.value)}
                  aria-label="Re-enter your password"
                  placeholder="Re-enter your password"
                  style={{
                    borderLeft:
                      passErrMsg === "Strong Password ✔"
                        ? "4px solid green"
                        : passErrMsg === ""
                        ? "none"
                        : "5px solid red",
                    boxShadow: "none",
                  }}
                />
              </InputGroup>
              {/* for displaying the status of the input */}
              {displayPassErrorMsg && (
                <Form.Text
                  className="errorMsg text-small float-start fw-semibold"
                  style={{
                    color:
                      passErrMsg === "Strong Password ✔" ? "green" : "#d21313",
                  }}
                >
                  {passErrMsg}
                </Form.Text>
              )}
            </div>

            <button
              className="btn btn-dark w-100 mb-4 mt-2 fw-semibold text-small"
              disabled={isDisabled}
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
}

// <div className="divider or mb-4">
//           <hr className="hrLeft" />
//           or
//           <hr className="hrRight" />
//         </div>
//         <button className="btn btn-primary w-100 mb-4 fw-semibold google text-small">
//           <FcGoogle className="googleSvg" />
//           Continue with Google
//         </button>
//         <br></br>
//         <button className="btn btn-outline-dark w-100 fw-semibold d-flex justify-content-center align-items-center text-small">
//           <FaApple className="me-1" />
//           Continue with Apple
//         </button>
//         <div className="divider acc mt-5">
//           <Link to="/auth/signup">
//             <a>Don`t have a Bookshouse account?</a>
//           </Link>
//           <hr className="hrRight" />
//         </div>
//         <button
//           className="btn btn-outline-dark mt-4 mb-4 fw-semibold text-small signUp "
//           onClick={signupHandler}
//         >
//           Sign Up
//         </button>
