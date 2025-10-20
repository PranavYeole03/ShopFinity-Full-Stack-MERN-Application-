import React from "react";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <section className="bg-white h-screen w-full ">
      <div className="m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
        <p className="text-red-800 font-bold text-lg text-center">
          Order Cancel
        </p>

        <Link
          to="/"
          className="bg-white hover:font-semibold border border-green-900 text-red-900 hover:bg-yellow-300 hover:text-black transition-all px-4 py-1"
        >
          Go To Home
        </Link>
      </div>
    </section>
  );
};

export default Cancel;
