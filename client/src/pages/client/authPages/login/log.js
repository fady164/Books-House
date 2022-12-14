import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaApple, FaLock, FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { object, string, TypeOf } from "zod";

import validator from "validator";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import ProtectedComponent from "../../../../features/ProtectedComponent";
import { useLoginUserMutation } from "../../../../features/authApiSlice";
import { toast } from "react-toastify";
import "./Login.css";

export default function Login2() {
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

  const loginSchema = object({
    email: string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: string()
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
  });

  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from.pathname || "/mainprofile";
  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Welcome back again 😍");
      navigate(from);
    }
    if (isError) {
      console.log(error.data);

      toast.error(error.data, {
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
    // ? Executing the loginUser Mutation
    console.log(values);
    loginUser(values);
  };

  // const signupHandler = () => {
  //   navigate("/auth/signup");
  // };
  return (
    <div className="main mt-5">
      <div className="centeredElement mt-5 shadow-lg bg-body">
        <div className="auth">
          <h5 className="my-5">Login to Bookshouse</h5>
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
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <InputGroup className="userInput mb-2">
                  <InputGroup.Text id="basic-addon2">
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    {...register("password", {
                      required: "Password is required!",
                    })}
                    // {...register("password", {
                    //   required: "Contraseña es obligatoria",
                    // })}
                    name="password"
                    aria-label="Password Input"
                    placeholder="Password"
                  />
                </InputGroup>
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password.message}
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
                Login
              </LoadingButton>
            </Form>
          </FormProvider>
          <div className="divider acc mb-3">
            <Link to="/auth/forgetpass">
              <a>
                <span className="text-primary">Forgot your password?</span>
              </a>
            </Link>
          </div>
          <div className="divider acc ">
            <hr className="hrLeft text-small" />
            <Link to="/auth/register">
              <a>Don`t have an account?</a>
            </Link>
            <hr className="hrRight" />
          </div>
          <Link to="/auth/register">
            <button className="btn btn-outline-dark mt-4 mb-4 fw-semibold text-small signUp ">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
