// import toast from "react-hot-toast";

// const AxiosToastError = (error) => {
//   toast.error(error?.response?.data?.message);
// };

// export default AxiosToastError;


import toast from "react-hot-toast";

const AxiosToastError = (error) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message;

  // Auth errors are handled by Axios interceptor
  if (status === 401) return;

  toast.error(message || "Something went wrong");
};

export default AxiosToastError;
