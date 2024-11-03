// LoginPage.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../apis/actions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, successLogin, userToken } = useSelector(
    (state) => state.api
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (successLogin && userToken) navigate("/");
  }, [successLogin, userToken]);

  return (
    <Container
      maxWidth="sm"
      className="h-screen flex flex-col items-center justify-center"
    >
      <Typography variant="h4" className="text-center mb-6">
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          {loading ? <CircularProgress size="20px" color="white" /> : "Sign In"}
        </Button>
        <div className="ms-auto w-fit mt-2">
          <Link to="/signup">
            <Typography>Don't have an account?</Typography>
          </Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
