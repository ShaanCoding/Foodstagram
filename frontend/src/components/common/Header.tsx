import React from "react";
import { Link } from "react-router-dom";
import Foostaram from "../../images/Foostaram.svg";

import userAvatar from "../../images/icons/avatar.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

type headerStates = "None" | "Home" | "CreatePost" | "Explore" | "Heart";

interface iHeaderState {
  headerFocused?: headerStates;
}

const Header = ({ headerFocused = "None" }: iHeaderState) => {
  return (
    <div className="bg-white flex items-center justify-between w-full py-4 px-32 border-b-[1px] border-light-gray mb-16">
      <Link to="/">
        <div className="">
          <img className="h-8 touch:" src={Foostaram} />
        </div>
      </Link>

      <div className="w-full lg:w-1/2 flex justify-end items-center relative">
        <input
          className="focus:ring-0 focus:outline-none bg-gray-100 text-black text-base p-2 rounded-md w-full"
          type="text"
          placeholder="Search Artwork / Creators Name"
        />
        <FontAwesomeIcon
          className="absolute w-5 h-5 mr-4 pointer-events-none"
          icon={solid("search")}
        />
      </div>

      <div className="flex items-center justify-center">
        {/* Create post */}
        <div className="px-4">
          <FontAwesomeIcon
            className="w-6 h-6"
            icon={
              headerFocused == "CreatePost"
                ? solid("square-plus")
                : regular("square-plus")
            }
          />
        </div>

        {/* Explore */}
        <div className="px-4">
          <Link to="/explore">
            <FontAwesomeIcon
              className="w-6 h-6"
              icon={
                headerFocused == "Explore"
                  ? solid("compass")
                  : regular("compass")
              }
            />
          </Link>
        </div>

        {/* Heart modal */}
        <div className="px-4">
          <Link to="/favorite">
            <FontAwesomeIcon
              className="w-6 h-6"
              icon={
                headerFocused == "Heart" ? solid("heart") : regular("heart")
              }
            />
          </Link>
        </div>

        {/* Profile icon */}
        <div className="px-4">
          <Link to="/profile">
            {/* Load up avatar */}
            <img
              className="w-8 h-8 rounded-full border-2 border-gray-700"
              src={userAvatar}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
