import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center m-4">
        <Link to="/">
          <a className="px-4 hover:underline">Home</a>
        </Link>
        <Link to="About">
          <a className="px-4 hover:underline">About</a>
        </Link>
        <Link to="About">
          <a className="px-4 hover:underline">Locations</a>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        &copy; 2022-{new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Footer;
