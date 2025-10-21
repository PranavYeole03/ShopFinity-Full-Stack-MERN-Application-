import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuCircleUserRound } from "react-icons/lu";
import UserProfileAvatar from "../components/UserProfileAvatar";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatar, setProfileAvatar] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Generate a consistent background color based on username
  const getColorFromName = (name) => {
    if (!name) return "bg-gray-400";
    const colors = [
      "bg-red-400",
      "bg-yellow-400",
      "bg-green-400",
      "bg-blue-400",
      "bg-indigo-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-orange-400",
      "bg-teal-400",
    ];
    const index = name.charCodeAt(10) % colors.length;
    return colors[index];
  };

  return (
    <div className="p-4">
      {/* Profile Upload a Image */}
      <div
        className={`w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm ${
          !user.avatar && user.name ? getColorFromName(user.name) : ""
        }`}
      >
        {user.avatar ? (
          <img
            alt={user.name}
            src={user.avatar}
            className="w-full h-full object-cover"
          />
        ) : user.name ? (
          <span className="text-5xl font-semibold text-white hover:text-neutral-800/60">
            {user.name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <LuCircleUserRound size={65} className="text-gray-600" />
        )}
      </div>

      <button
        onClick={() => setProfileAvatar(true)}
        className="text-sm w-20 border border-amber-300 hover:bg-blue-300 px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>

      {openProfileAvatar && (
        <UserProfileAvatar close={() => setProfileAvatar(false)} />
      )}

      {/* Other User Information Changes Form */}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="grid">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-b-amber-200 rounded"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        {/* Email field */}
        <div className="grid">
          <label>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-b-amber-200 rounded"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>
        {/* Mobile field */}
        <div className="grid">
          <label>Mobile No</label>
          <input
            type="number"
            id="mobile"
            placeholder="Enter Your Mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-b-amber-200 rounded"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="border px-4 py-2 font-semibold bg-blue-300 hover:bg-purple-500 border-b-cyan-900 text-gray-800 hover:text-lime-400 rounded">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
