import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaApple, FaLock, FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { object, string, TypeOf } from "zod";

import validator from "validator";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton as _LoadingButton } from "@mui/lab";

import { useDispatch } from "react-redux";
import ProtectedComponent from "../../../../features/ProtectedComponent";
import { toast } from "react-toastify";
import "../Login.css";
import { useVerifyEmailMutation } from "../../../../features/authApiSlice";

export default function EmailVerificationPage() {
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

  const verificationCodeSchema = object({
    verificationCode: string()
      .min(1, "Verification code is required")
      .min(9, "Make sure you get that from your email!"),
  });

  const { verificationCode } = useParams();

  const methods = useForm({
    resolver: zodResolver(verificationCodeSchema),
  });

  const [verifyEmail, { isLoading, isSuccess, data, isError, error }] =
    useVerifyEmailMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const {
    reset,
    handleSubmit,
    register,
    password,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      toast.success(data?.message);
      navigate("/auth/login");
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
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler = ({ verificationCode }) => {
    // ? Executing the verifyEmail Mutation

    verifyEmail({ verificationCode });
    console.log(verificationCode);
  };

  // const signupHandler = () => {
  //   navigate("/auth/signup");
  // };
  return (
    <div className="main mt-5">
      <div className="centeredElement mt-5 shadow-lg bg-body">
        <div className="auth">
          <h5 className="my-5">Check Your Email for Verification.</h5>
          {/* if the user clicked outside the input the status of the error message will appear */}
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Email</Form.Label> */}
                <InputGroup className="userInput ">
                  {/* user icon */}
                  <InputGroup.Text id="basic-addon1">
                    <FaUserAlt />
                  </InputGroup.Text>
                  <Form.Control
                    {...register("verificationCode")}
                    name="verificationCode"
                    aria-label="Verification Code Input"
                    placeholder="Verification Code"
                    value={verificationCode ? verificationCode : ""}
                  />
                </InputGroup>
                {errors.verificationCode && (
                  <Form.Text className="text-danger">
                    {errors.verificationCode.message}
                  </Form.Text>
                )}
              </Form.Group>

              <LoadingButton
                variant="contained"
                sx={{ mt: 3, mb: 5 }}
                fullWidth
                disableElevation
                type="submit"
                loading={isLoading}
              >
                Verify Email
              </LoadingButton>
            </Form>
          </FormProvider>

          <div className="divider acc mt-5">
            <hr className="hrLeft text-small" />
            <a>Please check your Email</a>
            <hr className="hrRight" />
          </div>
        </div>
      </div>
    </div>
  );
}
