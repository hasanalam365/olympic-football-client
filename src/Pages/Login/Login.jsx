import React, {
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const {
    signIn,
    googleLogin,
    resetPassword,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] =
    useState("");

  const [error, setError] =
    useState("");

  const from =
    location.state?.from?.pathname ||
    "/";

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const email =
      form.email.value;

    const password =
      form.password.value;

    try {
      await signIn(
        email,
        password
      );

      Swal.fire({
        icon: "success",
        title: "Login Success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin =
    async () => {
      try {
        await googleLogin();

        Swal.fire({
          icon: "success",
          title: "Login Success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(from);
      } catch (err) {
        setError(err.message);
      }
    };

  const handleForgotPassword =
    async () => {
      if (!email) {
        return Swal.fire({
          icon: "warning",
          title:
            "Enter email first",
        });
      }

      try {
        await resetPassword(email);

        Swal.fire({
          icon: "success",
          title:
            "Password reset email sent",
        });
      } catch (err) {
        setError(err.message);
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">

      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl">

        <h2 className="mb-6 text-3xl font-bold text-center">
          Login
        </h2>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full input input-bordered"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full input input-bordered"
          />

          <button className="w-full btn btn-primary">
            Login
          </button>
        </form>

        <button
          onClick={
            handleGoogleLogin
          }
          className="w-full mt-3 btn btn-outline"
        >
          Continue With Google
        </button>

        <button
          onClick={
            handleForgotPassword
          }
          className="mt-4 text-blue-500"
        >
          Forgot Password?
        </button>

        {error && (
          <p className="mt-3 text-red-500">
            {error}
          </p>
        )}

        <p className="mt-4 text-center">
          New here?
          <Link
            to="/register"
            className="ml-2 text-blue-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;