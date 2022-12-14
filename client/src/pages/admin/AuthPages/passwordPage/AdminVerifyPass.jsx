import React, { useState, useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaLock } from "react-icons/fa";
import { object, string, TypeOf } from "zod";

import { LoadingButton as _LoadingButton } from "@mui/lab";
import { GoEye } from "react-icons/go";
import { BsEyeSlash } from "react-icons/bs";
import "../Login.css";
import validator from "validator";
// import AuthFooter from "../AuthFooter/AuthFooter";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useForgetPasswordMutation,
  useVerifyEmailMutation,
} from "../../../../features/authApiSlice";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material/styles";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #212529;
  color: #fff;
  font-weight: 500;
  border-radius: 50px;

  &:hover {
    background-color: #000000;
    transform: translateY(-1px);
  }
`;

export default function VerifyAdminPass() {
  //The state of the error message
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const myArr = [new Array(6).fill("")];
  const [otp, setOtp] = useState(...myArr);
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, i) => (i === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  // const validOTPLength = (num)=>{num.join("").length == 6;}

  const validOTPLength = otp.join("").length == 6;

  const passwordSchema = object({
    newpassword: string()
      .regex(
        new RegExp("(?=.*[0-9])"),
        "Password must have at least one numeric character!"
      )
      .regex(
        new RegExp("(?=.*[!@#$%^&*])"),
        "Password must have at least one special character!"
      )
      .regex(
        new RegExp("(?=.*[A-Z])"),
        "Password must have at least one uppercase character!"
      )
      .regex(
        new RegExp("(?=.*[a-z])"),
        "Password must have at least one lowercase character!"
      )
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string().min(1, "Please confirm your password"),
  }).refine((data) => data.newpassword === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });
  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: zodResolver(passwordSchema),
  });

  const {
    reset,
    handleSubmit,
    register,

    formState: { isSubmitSuccessful, errors },
  } = methods;
  const email = useSelector((state) => state.temporaryEmail);
  const [forgetPassword, { isLoading, isError, error, isSuccess }] =
    useForgetPasswordMutation();

  const deletePasswords = (e) => {
    setOtp([...otp.map((v) => "")]);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Changed Successfully.");
      navigate("/@admin");
    }
    if (isError) {
      console.log(error.data);

      toast.error(error.data.message, {
        position: "top-right",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  useEffect(() => {
    if (isSubmitSuccessful) {
      setOtp([...otp.map((v) => "")]);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (validOTPLength) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [validOTPLength]);
  const onSubmitHandler = (values) => {
    // ? Executing the RegisterUser Mutation
    // registerUser(values);
    forgetPassword({ ...values, code: otp.join(""), email: email.tempEmail });
  };

  return (
    <>
      <div className="main mt-3">
        <div className="centeredElement shadow-lg p-3 mb-2 bg-body">
          <div className="auth">
            <p className="h4 my-5 text-center">{`Code has been sent to ${
              email.tempEmail ? email.tempEmail : "your email"
            }.`}</p>
            <div className="row">
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

                {/* if the user clicked outside the input the status of the error message will appear */}
                <FormProvider {...methods}>
                  <Form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <InputGroup className="userInput mb-2">
                        <InputGroup.Text id="basic-addon2">
                          <FaLock />
                        </InputGroup.Text>
                        <Form.Control
                          data-tip="Must be 8 or more contain a number, uppercase and special character"
                          data-event="focus"
                          type="password"
                          {...register("newpassword")}
                          name="newpassword"
                          aria-label="Password Input"
                          placeholder="New Password"
                        />
                        <ReactTooltip
                          eventOff="blur"
                          place="top"
                          type="dark"
                          effect="solid"
                        />
                      </InputGroup>
                      {errors.newpassword && (
                        <Form.Text className="text-danger">
                          {errors.newpassword.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <InputGroup className="userInput mb-2">
                        <InputGroup.Text id="basic-addon2">
                          <FaLock />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          {...register("passwordConfirm")}
                          name="passwordConfirm"
                          aria-label="Confirm Password"
                          placeholder="Confirm Password"
                        />
                      </InputGroup>
                      {errors.passwordConfirm && (
                        <Form.Text className="text-danger">
                          {errors.passwordConfirm.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <div className="d-flex flex-row ">
                      <button
                        className="btn btn-secondary w-50 m-1"
                        type="button"
                        onClick={deletePasswords}
                      >
                        Clear
                      </button>
                      <button
                        className="btn btn-primary w-50"
                        type="submit"
                        disabled={isDisabled}
                        // onClick={submitMyInputs}
                      >
                        Verify
                      </button>
                    </div>
                  </Form>
                </FormProvider>
              </div>
            </div>

            <div className="divider acc mt-2">
              {/* If the user doesn`t have an account` */}
              <hr className="hrLeft text-small" />
              <Link to="/auth/verification">
                <a>
                  Didn't get OTP?
                  <span className="text-primary"> Resend it</span>
                </a>
              </Link>
              <hr className="hrRight" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
