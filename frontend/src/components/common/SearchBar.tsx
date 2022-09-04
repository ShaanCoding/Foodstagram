import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SearchBar = () => {
  const handleSearch = () => {

  }

  return (
    <form className="w-full lg:w-1/2 flex justify-end items-center relative" onSubmit={handleSearch}>
      <input
        className="focus:ring-0 focus:outline-none bg-gray-100 text-black text-base p-2 rounded-md w-full"
        type="text"
        placeholder="Search Artwork / Creators Name"
      />
      <FontAwesomeIcon
        className="absolute w-5 h-5 mr-4 pointer-events-none"
        icon={solid("search")}
      />
    </form>
  )
}

export default SearchBar;