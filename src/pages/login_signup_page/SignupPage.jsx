import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import Lottie from "react-lottie";
import animationData from "../../lottie-animation/loginAnimation.json";
import API from "@/axios/axios";

function SignupPage() {
  const navigate = useNavigate();
  const [strength, setStrength] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nic: "",
    phone: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    checkStrength(formData.password);
  }, [formData.password]);

  const checkStrength = (password) => {
    let strength = 0;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    if (password.length > 7) strength++;
    setStrength(strength);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await API.post("/api/v1/user/patient/register", formData, {
        withCredentials: true,
      });
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-teal-100 to-white">
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js"></script>
      </Helmet>

      {/* Lottie animation */}
      <div className="md:w-1/2 flex justify-center items-center p-6">
        <Lottie options={defaultOptions} height={350} width={350} />
      </div>

      {/* Signup form */}
      <div className="md:w-1/2 bg-white p-6 sm:p-10 rounded-lg shadow-xl max-w-2xl mx-auto my-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">It's quick and easy</p>

        <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inputs */}
          {[
            { id: "firstName", label: "First Name" },
            { id: "lastName", label: "Last Name" },
            { id: "dob", label: "Date of Birth", type: "date" },
            { id: "nic", label: "NIC" },
            { id: "phone", label: "Phone Number", type: "tel" },
            { id: "email", label: "Email", type: "email" },
          ].map(({ id, label, type = "text" }) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={id}
                id={id}
                value={formData[id]}
                onChange={handleInputChange}
                required
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
          ))}

          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </form>

        {/* Password strength bar */}
        <div className="mt-4 mb-6">
          <div className="h-2 rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all duration-300`}
              style={{
                width: `${strength * 25}%`,
                backgroundColor:
                  strength <= 1
                    ? "red"
                    : strength === 2
                    ? "orange"
                    : strength === 3
                    ? "gold"
                    : "green",
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right pr-1">
            {["Weak", "Fair", "Good", "Strong"][strength - 1] || ""}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          onClick={handleSignup}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
        >
          Create New Account
        </button>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-teal-700 hover:underline">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;

