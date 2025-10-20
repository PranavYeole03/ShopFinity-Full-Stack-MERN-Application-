import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.jsx";
import AxiosToastError from "../utils/AxiosToastError.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password Must Be Same");
      return;
    }
    try {
      if (!data.email.includes("@")) {
        toast.error("Enter a valid email address");
        return;
      }
      if (data.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);

        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      }
    } catch (error) {
      AxiosToastError;
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold">Welcome to ShopFinity</p>

        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-white p-2 border rounded outline-none focus:border-red-600"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
          </div>
          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              autoFocus
              className="bg-white p-2 border rounded outline-none focus:border-red-600"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            />
          </div>
          {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className="bg-white p-2 border rounded flex items-center focus-within:border-b-green-500">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoFocus
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          {/* ConfirmPassword */}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="bg-white p-2 border rounded flex items-center  focus-within:border-b-yellow-400">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoFocus
                className="w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter Your Confirm Password"
              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-700 " : "bg-gray-400"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Register
          </button>
        </form>

        <p>
          Already have an account? Login here.{" "}
          <Link
            to={"/login"}
            className="font-semibold text-sky-500 hover:text-yellow-400"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
