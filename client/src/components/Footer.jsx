import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>© All Right Reserved 2025</p>
        <div className="flex items-center gap-4 justify-center text-2xl">
          <a href="" className="hover:text-blue-600">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-pink-600">
            <FaInstagram />
          </a>
          <a href="" className="hover:text-emerald-400">
            <FaWhatsapp />
          </a>
          <a href="" className="hover:text-blue-500">
            <CiLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
