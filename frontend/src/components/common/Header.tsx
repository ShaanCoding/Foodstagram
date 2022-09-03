import React from "react";
import { Link } from "react-router-dom";
import Foostaram from "../../images/Foostaram.svg";

import userAvatar from "../../images/icons/avatar.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import SearchBar from "./SearchBar";

type headerStates = "None" | "Home" | "CreatePost" | "Explore" | "Heart";

interface iHeaderState {
  headerFocused?: headerStates;
}

const Header = ({ headerFocused = "None" }: iHeaderState) => {
  return (
    <div className="bg-white flex items-center justify-between w-full py-4 px-32 border-b-[1px] border-light-gray mb-16">
      <Link to="/">
        <div className="">
          <img className="h-8 touch:" src={Foostaram} alt="Foostaram"/>
        </div>
      </Link>

      <SearchBar />

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
                headerFocused === "Heart" ? solid("heart") : regular("heart")
              }
            />
          </Link>
        </div>

        {/* Profile icon */}
        <div className="px-4">
          {/* Load up avatar */}
          <img alt="avatar"
            className="w-8 h-8 rounded-full border-2 border-gray-700"
            src={userAvatar}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
