import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AuthService from "../../services/authService";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    setMessage("");
    setLoading(true);

    AuthService.login(data.username, data.password)
      .then(() => {
        navigate("/profile");
        // Reload nếu thật sự cần (khuyến nghị dùng context thay vì reload)
        // window.location.reload();
      })
      .catch((error) => {
        const resMessage =
          error.response?.data?.message || error.message || error.toString();

        setLoading(false);
        setMessage(resMessage);
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
          <div className="mb-4">
            <label className="block font-medium mb-1">Username</label>
            <input
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
            <label className="block font-medium mb-1">Password</label>
            <input
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
              className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              Login
            </button>
          </div>

          {message && (
            <div className="mt-4">
              <div className="bg-red-100 text-red-700 p-3 rounded" role="alert">
                {message}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
