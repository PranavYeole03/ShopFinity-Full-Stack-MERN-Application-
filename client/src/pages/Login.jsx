import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.jsx";
import AxiosToastError from "../utils/AxiosToastError.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails.js";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice.js";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              autoFocus
              className="bg-white p-2 border rounded outline-none focus:border-black"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
            />
          </div>
          {/* Password */}
          <div className="grid gap-1">
            <label htmlFor="password">Password:</label>
            <div className="bg-white p-2 border rounded flex items-center focus-within:border-black">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
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
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-yellow-200"
            >
              Forgot Password ?
            </Link>
          </div>

          {/* Submit */}
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-700 " : "bg-gray-400"
            }  text-white py-2 rounded font-semibold my-3 tracking-wide `}
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?
          <Link
            to={"/register"}
            className="font-semibold text-sky-500 hover:text-yellow-400"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
