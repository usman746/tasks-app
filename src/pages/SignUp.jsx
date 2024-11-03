// SignUp.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../apis/actions";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success } = useSelector((state) => state.api);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  // Watch the password to ensure the confirmation matches
  const password = watch("password", "");

  useEffect(() => {
    if (!loading && success) navigate("/login");
  }, [success]);

  return (
    <Container
      maxWidth="sm"
      className="h-screen flex flex-col items-center justify-center"
    >
      <Typography variant="h4" className="text-center mb-6">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
        {/* Name Field */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Name"
          {...register("name", {
            required: "Name is required",
          })}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />

        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Confirm Password Field */}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : ""
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Sign Up
        </Button>
        <div className="ms-auto w-fit mt-2">
          <Link to="/login">
            <Typography>Already have an account?</Typography>
          </Link>
        </div>
      </form>
    </Container>
  );
}

export default SignUp;
