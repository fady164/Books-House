import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaApple, FaLock, FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { object, string, TypeOf } from "zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import ProtectedComponent from "../../../../features/ProtectedComponent";
import { useRegisterUserMutation } from "../../../../features/authApiSlice";
import { toast } from "react-toastify";
import "../Login.css";

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

// const LinkItem = styled(Link)`
//   text-decoration: none;
//   color: #2363eb;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

const registerSchema = object({
  name: string().min(4, "Name is required").max(30, "Try shorter name!"),
  phone: string()
    .min(1, "Phone number is required")
    .regex(
      new RegExp("([+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6})"),
      "Not a valid phone number!"
    ),
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
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

const RegisterPage = () => {
  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  // ? Calling the Register Mutation
  const [registerUser, { isLoading, isSuccess, error, isError }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    register,

    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully");
      reset();

      navigate("/user/confirmEmail");
    }

    if (isError) {
      console.log(error);

      toast.error(error?.data, {
        position: "top-right",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onSubmitHandler = (values) => {
    // ? Executing the RegisterUser Mutation
    console.log(values);
    registerUser(values);
  };

  return (
    <div className="main mt-5">
      <div className="centeredElement mt-5 shadow-lg bg-body">
        <div className="auth">
          <h5 className="my-5">Welcome to Bookshouse</h5>
          {/* if the user clicked outside the input the status of the error message will appear */}
          <FormProvider {...methods}>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
              <Form.Group className="mb-3" controlId="formBasicName">
                {/* <Form.Label>Email</Form.Label> */}
                <InputGroup className="userInput ">
                  {/* user icon */}
                  <InputGroup.Text id="basic-addon1">
                    <FaUserAlt />
                  </InputGroup.Text>

                  <Form.Control
                    name="name"
                    {...register("name")}
                    aria-label="Name Input"
                    placeholder="Name"
                  />
                </InputGroup>
                {errors.name && (
                  <Form.Text className="text-danger">
                    {errors.name.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <InputGroup className="userInput ">
                  {/* user icon */}
                  <InputGroup.Text id="basic-addon2">
                    <MdEmail />
                  </InputGroup.Text>
                  <Form.Control
                    name="email"
                    {...register("email")}
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
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <InputGroup className="userInput ">
                  {/* user icon */}
                  <InputGroup.Text id="basic-addon1">
                    <FaPhoneAlt />
                  </InputGroup.Text>
                  <Form.Control
                    name="phone"
                    {...register("phone")}
                    aria-label="Phone Input"
                    placeholder="Phone"
                  />
                </InputGroup>
                {errors.phone && (
                  <Form.Text className="text-danger">
                    {errors.phone.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <InputGroup className="userInput mb-2">
                  <InputGroup.Text id="basic-addon2">
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    data-tip="Must be 8 or more contain a number, uppercase and special character"
                    data-event="focus"
                    type="password"
                    {...register("password")}
                    name="password"
                    aria-label="Password Input"
                    placeholder="Password"
                  />
                  <ReactTooltip
                    eventOff="blur"
                    place="top"
                    type="dark"
                    effect="solid"
                  />
                </InputGroup>
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password.message}
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
              <LoadingButton
                variant="contained"
                sx={{ mt: 3, mb: 5 }}
                fullWidth
                disableElevation
                type="submit"
                loading={isLoading}
              >
                Signup
              </LoadingButton>
            </Form>
          </FormProvider>

          <div className="divider acc">
            <hr className="hrLeft text-small" />
            <Link to="/auth/login">
              <a>Already have an account?</a>
            </Link>
            <hr className="hrRight" />
          </div>
          <Link to="/auth/login">
            <button className="btn btn-outline-dark mt-4 mb-4 fw-semibold text-small signUp ">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
