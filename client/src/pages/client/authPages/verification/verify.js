import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaApple, FaLock, FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import validator from "validator";
import { OTPBox } from "../otp/OtpPage";
import { toast } from "react-toastify";

import "./Verification.css";
import { useVerifyEmailMutation } from "../../../../features/authApiSlice";
export default function VerificationOtp() {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  // const verificationCode = useParams();

  //The state of the error message
  const [passErrMsg, setPassErrMessage] = useState("");
  
  
    // for displaying the error message if the input is invalid
    const [displayEmailErrorMsg, setDisplayEmailErrorMsg] = useState(false);
    const [displayPassErrorMsg, setDisplayPassErrorMsg] = useState(false);

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
  
  const [verifyEmail, { isLoading, isError, error, isSuccess, data }] =
    useVerifyEmailMutation();
  const myArr = [new Array(6).fill("")];
  const [otp, setOtp] = useState(...myArr);
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, i) => (i === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message, {
        position: "top-right",
      });
      navigate("/login");
    }
    if (isError) {
      if (Array.isArray(error.data)) {
        error.data.error.forEach((el) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error(error.data.message, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const validOTPLength = otp.join("").length == 6;
  useEffect(() => {
    if (validOTPLength) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [validOTPLength]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validOTPLength) {
      verifyEmail(otp.join(""));
      navigate("/auth/login");
    } else {
      toast.error("Enter a valid OTP", {
        position: "top-right",
      });
    }
    // console.log(otp.join(""));

    // verifyEmail({ verificationCode });
  };
  // const handleVerification = (e) => {
  //   // e.preventDefault();

  //   console.log("Your OTP is ");
  // };
  return (
    <Form className="mt-5" onSubmit={handleSubmit}>
      <div className="main">
        <div className="centeredElement shadow-lg p-3 mb-5 bg-body ">
          <div className="auth ">
            <p className="h4 my-5 text-center">Check Your Email</p>

            <p className="h6 mb-3">Please enter the new password.</p>
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
            <div className="row">
              <p className="h6">Enter The OTP sent to your Email.</p>
              <div className="col d-flex flex-row text-center " method="post">
                {otp.map((data, index) => (
                  <input
                    className="text-center fw-bold m-1 w-25 h-100 p-2 "
                    key={index}
                    value={data}
                    name="otp"
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    type="text"
                    maxLength="1"
                  />
                ))}
              </div>
              <div className="mt-4 text-center">
                <p>OTP Entered: {otp.join("")}</p>
                <div className="d-flex flex-row ">
                  <button
                    className="btn btn-secondary w-50 m-1"
                    type="button"
                    onClick={(e) => setOtp([...otp.map((v) => "")])}
                  >
                    Clear
                  </button>
                  <button
                    className="btn btn-primary w-50"
                    type="submit"
                    disabled={disabled}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>

            <div className="divider acc mt-2">
              {/* If the user doesn`t have an account` */}
              <hr className="hrLeft text-small" />
              <Link to="/auth/verification">
                <a>
                  Didn't recieve OTP yet?
                  <span className="text-primary">Resend it</span>
                </a>
              </Link>
              <hr className="hrRight" />
            </div>
            {/* if the user clicked outside the input the status of the error message will appear */}

            {/* for displaying the status of the input */}
            {/* {displayPassErrorMsg && (
                <Form.Text
                  className="errorMsg text-small float-start fw-semibold"
                  style={{
                    color:
                      passErrMsg === "Strong Password ✔" ? "green" : "#d21313",
                  }}
                >
                  {passErrMsg}
                </Form.Text>
              )} */}
          </div>
          {/*For loging in the website using email*/}
        </div>
      </div>
    </Form>
  );
}
