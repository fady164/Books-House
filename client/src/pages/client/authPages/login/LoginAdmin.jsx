import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../../components/client/MaterialForm/FormInput";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
// import { use } from "../../../../services/authApi";
import { useLoginAdminMutation } from "../../../../services/adminAuthApi";
const MyAdminLogin = () => {
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

  const LinkItem = styled(Link)`
    text-decoration: none;
    color: #2363eb;
    &:hover {
      text-decoration: underline;
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
    resolver: zodResolver(loginSchema),
  });

  // ? API Login Mutation
  const [LoginAdmin, { isLoading, isError, error, isSuccess }] =
    useLoginAdminMutation();

  const navigate = useNavigate();

  // const from = location.state?.from.pathname || "/profile";

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success("You successfully logged in");
      navigate("/admin");
    }
    if (isError) {
      console.log("inside login admin", error);
      toast.error(error.message, {
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
    LoginAdmin(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: 8,
          borderRadius: "10px",
          px: "20px",
          mt: "3%",
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          sx={{
            color: "#ffc107",
            fontWeight: 600,
            fontSize: { xs: "2rem", md: "3rem" },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body1"
          component="h2"
          sx={{ color: "#000", mb: 2 }}
        >
          Login to have access!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            maxWidth="27rem"
            width="100%"
            sx={{
              p: { xs: "1rem", sm: "2rem" },
              borderRadius: 2,
            }}
          >
            <FormInput
              name="email"
              label="Email Address"
              type="email"
              sx={{
                border: 1,
                borderColor: "#000",
                borderRadius: "10px",
                boxShadow: 3,
              }}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              sx={{
                border: 1,
                borderColor: "#000",
                borderRadius: "10px",
                boxShadow: 3,
              }}
            />

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Login
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default LoginAdmin;
