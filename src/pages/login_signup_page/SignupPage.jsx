import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import Lottie from "react-lottie";
import animationData from "../../lottie-animation/loginAnimation.json"; // Replace with your Lottie animation file

function SignupPage() {
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  const { password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/user/patient/register",
      formData,
      {
        withCredentials: true, // 👈 essentiel pour les cookies (token, sessions)
      }
    );

    toast.success("Signup successful!");
    console.log("Response:", response.data);

    // Redirection vers login ou autre après succès ?
    navigate("/login"); // si tu veux rediriger
  } catch (error) {
    console.error("Signup error:", error);

    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Signup failed. Please try again.");
    }
  }
};


  useEffect(() => {
    checkStrength(formData.password);
  }, [formData.password]);

  const checkStrength = (password) => {
    let strength = 0;

    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;
    }
    if (password.match(/([0-9])/)) {
      strength += 1;
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;
    }
    if (password.length > 7) {
      strength += 1;
    }

    setStrength(strength);
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
    <div
      className="flex h-screen"
      style={{ backgroundColor: "rgb(179, 218, 217)" }}
    >
      <Helmet>
        <script src="https://www.google.com/recaptcha/api.js"></script>
      </Helmet>
      <div className="w-1/2 flex justify-center items-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center bg-white  shadow-lg p-8">
        <div className="w-full max-w-md">
          <h1 className="font-bold text-3xl text-center mb-6">Signup</h1>
          <form className="flex flex-col" onSubmit={handleSignup}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="firstName" className="block mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  id="firstName"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="lastName" className="block mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  id="lastName"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="dob" className="block mb-1">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  id="dob"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="nic" className="block mb-1">
                  nic:
                </label>
                <input
                  type="text"
                  name="nic"
                  placeholder="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  id="number"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="phone" className="block mb-1">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  id="phone"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="email" className="block mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  id="email"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="gender" className="block mb-1">
                  Gender:
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  id="gender"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="password" className="block mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  id="password"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                />
              </div>
              <div className="w-1/2 px-2 mb-4">
                <label htmlFor="confirmPassword" className="block mb-1">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  id="confirmPassword"
                  required
                  className="border border-gray-300 rounded-md mb-4 p-2 w-full"
                />
              </div>
            </div>
            <div className="m-2 flex flex-col-reverse md:flex-row-reverse items-center">
              <div className="w-1/2">
                <div
                  style={{
                    height: "10px",
                    width: `${strength * 25}%`,
                    backgroundColor:
                      strength === 1
                        ? "red"
                        : strength === 2
                        ? "orange"
                        : strength === 3
                        ? "yellow"
                        : "green",
                  }}
                ></div>
              </div>
              <div className="w-1/2 flex items-center justify-around mt-4 md:mt-0">
                {["Weak", "Fair", "Good", "Strong"].map((label, index) => (
                  <div
                    key={index}
                    className={`text-sm ${index < strength ? "font-bold" : ""}`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <button className="bg-main_theme text-white font-bold py-2 px-4 rounded-md mt-4">
              Create New Account
            </button>
            <Link to="/login">
              <p
                className="my-3 p-1 md:p-0 text-purple-600 hover:underline"
                style={{ color: "rgb(27, 120, 120)" }}
              >
                Already have an account?
              </p>
            </Link>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
