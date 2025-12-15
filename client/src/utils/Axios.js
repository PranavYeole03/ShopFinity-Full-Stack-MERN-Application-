// import axios from "axios";
// import SummaryApi from "../common/SummaryApi";

// const Axios = axios.create({
//   baseURL: "https://shopfinity-full-stack-mern-application-5.onrender.com",
//   withCredentials: true,
// });

// // Request interceptor: attach access token
// Axios.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor: handle 401 and refresh token
// Axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (refreshToken) {
//         const newAccessToken = await refreshAccessToken(refreshToken);
//         if (newAccessToken) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return Axios(originalRequest);
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// const refreshAccessToken = async (refreshToken) => {
//   try {
//     const response = await Axios({
//       ...SummaryApi.RefreshToken,
//       headers: { Authorization: `Bearer ${refreshToken}` },
//     });
//     const accessToken = response.data.data.accessToken;
//     localStorage.setItem("accessToken", accessToken);
//     return accessToken;
//   } catch (error) {
//     console.error("Refresh token failed:", error.response || error);
//     return null;
//   }
// };

// export default Axios;

import axios from "axios";
import { baseURL } from "../common/SummaryApi";

/**
 * Axios instance for Render backend
 * Cookie-based authentication only
 */
const Axios = axios.create({
  baseURL: "https://shopfinity-full-stack-mern-application-5.onrender.com",
  withCredentials: true,
});

export default Axios;
