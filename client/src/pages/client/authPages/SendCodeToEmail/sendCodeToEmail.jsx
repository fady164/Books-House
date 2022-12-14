import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaApple, FaLock, FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { object, string, TypeOf } from "zod";
import { MdEmail } from "react-icons/md";
import validator from "validator";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { tempEmailActions } from "../../../../store/client/reducers/tempEmail";
import ProtectedComponent from "../../../../features/ProtectedComponent";
import { toast } from "react-toastify";
import { useSendCodeMutation } from "../../../../features/authApiSlice";
import { useDispatch } from "react-redux";
import "../Login.css";

export default function SendCodeToEmail() {
  const { addTempEmail } = tempEmailActions;
  const dispatch = useDispatch();
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

  const sendCodeSchema = object({
    email: string()
      .min(1, "Email is required to send OTP.")
      .email("Email Address is invalid!"),
  });

  const methods = useForm({
    resolver: zodResolver(sendCodeSchema),
  });
  const [sendCode, { isLoading, isError, isSuccess, error, data }] =
    useSendCodeMutation();

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      reset();
      console.log("data", data);
      toast.success(data?.message);
      navigate("/auth/password");
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

  const onSubmitHandler = (values) => {
    // ? Executing the verifyEmail Mutation
    console.log(values);
    dispatch(addTempEmail(values));

    sendCode(values);
  };

  // const signupHandler = () => {
  //   navigate("/auth/signup");
  // };
  return (
    <div className="main mt-5">
      <div className="centeredElement mt-5 shadow-lg bg-body">
        <div className="auth">
          <h5 className="my-5">Enter your Email to reset password.</h5>
          {/* if the user clicked outside the input the status of the error message will appear */}
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Email</Form.Label> */}
                <InputGroup className="userInput ">
                  {/* user icon */}
                  <InputGroup.Text id="basic-addon2">
                    <MdEmail />
                  </InputGroup.Text>
                  <Form.Control
                    {...register("email")}
                    name="email"
                    className="border border-opacity-10"
                    aria-label="Email Input"
                    placeholder="Email"
                  />
                </InputGroup>
                {errors.email && (
                  <Form.Text className="text-danger">
                    {errors.email.message}
                  </Form.Text>
                )}
              </Form.Group>

              <LoadingButton
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                disableElevation
                type="submit"
                loading={isLoading}
              >
                Send Code
              </LoadingButton>
            </Form>
          </FormProvider>

          <div className="divider acc mt-2 mb-3">
            <hr className="hrLeft text-small" />
            <a>Please check your Email</a>
            <hr className="hrRight" />
          </div>
        </div>
      </div>
    </div>
  );
}
