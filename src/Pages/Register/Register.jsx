import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    const form = e.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUser(
        email,
        password
      );

      await updateUserProfile(
        name,
        photo
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl">

        <h2 className="mb-6 text-3xl font-bold text-center">
          Register
        </h2>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full input input-bordered"
          />

          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="w-full input input-bordered"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full input input-bordered"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full input input-bordered"
          />

          <button
            className="w-full btn btn-primary"
          >
            Register
          </button>
        </form>

        {error && (
          <p className="mt-3 text-red-500">
            {error}
          </p>
        )}

        <p className="mt-4 text-center">
          Already have account?
          <Link
            to="/login"
            className="ml-2 text-blue-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;