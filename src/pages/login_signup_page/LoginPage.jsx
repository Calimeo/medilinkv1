import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";
import animationData from "../../lottie-animation/loginAnimation.json";
import API from "@/axios/axios.js";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await API.post(
        "/api/v1/user/login",
        { email, password, confirmPassword, role: "Patient" },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
        navigate("/homepage");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-tr from-teal-100 to-teal-300 p-4">
      {/* Animation */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>

      {/* Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-600 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between text-sm mt-6 text-teal-700">
          <Link to="/signup" className="hover:underline">Create Account</Link>
          <Link to="/" className="hover:underline">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
