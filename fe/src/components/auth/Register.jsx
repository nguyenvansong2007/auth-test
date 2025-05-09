import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import AuthService from "../../services/authService";

// 🔒 Schema validation với Yup
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
});

const Register = () => {
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setMessage("");
    setSuccessful(false);

    AuthService.register(data.username, data.email, data.password)
      .then((response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message || error.message || error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
  
        <form onSubmit={handleSubmit(onSubmit)}>
          {!successful && (
            <>
              <div className="mb-4">
                <label htmlFor="username" className="block font-medium mb-1">Username</label>
                <input
                  name="username"
                  type="text"
                  {...register("username")}
                  className={`w-full px-3 py-2 border rounded focus:outline-none ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.username.message}
                  </div>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium mb-1">Email</label>
                <input
                  name="email"
                  type="text"
                  {...register("email")}
                  className={`w-full px-3 py-2 border rounded focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </div>
                )}
              </div>
  
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  {...register("password")}
                  className={`w-full px-3 py-2 border rounded focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </div>
                )}
              </div>
  
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
  
          {message && (
            <div className="mt-4">
              <div
                className={`p-3 rounded ${
                  successful
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
  
};

export default Register;
