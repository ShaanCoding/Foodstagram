import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ManagePostTableRows from "../../components/business/ManagePostTableRows";

const ManagePosts = () => {
  const [openTab, setOpenTab] = useState("published");

  return (
    <div className="mx-16">
      <div className="my-3">
        {/* View by Published, Schedule or Draft */}
        <div className="flex items-center justify-start py-4 border-b-[1px] border-light-gray">
          <div>
            <button
              className={`font-semibold py-1 px-2 rounded-sm mx-2 opacity-50 hover:opacity-100 ${
                openTab == "published"
                  ? "bg-insta-light-blue text-insta-dark-blue hover:bg-insta-light-blue-hover"
                  : "bg-slate-100"
              }`}
              onClick={() => setOpenTab("published")}
            >
              Published
            </button>
          </div>
          <div>
            <button
              className={`font-semibold py-1 px-2 rounded-sm mx-2 opacity-50 hover:opacity-100 ${
                openTab == "scheduled"
                  ? "bg-insta-light-blue text-insta-dark-blue hover:bg-insta-light-blue-hover"
                  : "bg-slate-100"
              }`}
              onClick={() => setOpenTab("scheduled")}
            >
              Scheduled
            </button>
          </div>
          <div>
            <button
              className={`font-semibold py-1 px-2 rounded-sm mx-2 opacity-50 hover:opacity-100 ${
                openTab == "drafts"
                  ? "bg-insta-light-blue text-insta-dark-blue hover:bg-insta-light-blue-hover"
                  : "bg-slate-100"
              }`}
              onClick={() => setOpenTab("drafts")}
            >
              Drafts
            </button>
          </div>
        </div>

        {/* Show Posts Search Bar */}
        <div className="flex items-center justify-between py-4">
          <select>
            <option>Photos</option>
            <option>Videos</option>
          </select>
          <div className="flex justify-end items-center relative">
            <input
              className="w-full pl-12 pr-2 border-[1px] border-light-gray py-2 rounded-md"
              type="text"
              placeholder="Search Artwork / Creators Name"
            />
            <FontAwesomeIcon
              className="absolute w-5 h-5 left-2 pointer-events-none"
              icon={solid("search")}
            />
          </div>
        </div>

        {openTab == "published" && (
          <table className="table-fixed w-full overflow-hidden">
            <thead>
              <tr>
                <th colSpan={1}></th>
                <th className="text-left" colSpan={8}>
                  <p className="text-sm font-semibold mr-2">Title</p>
                </th>
                <th className="text-left" colSpan={4}>
                  <p className="text-sm font-semibold mr-2">Date published</p>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">Reach</p>
                    <FontAwesomeIcon
                      className="text-gray-900"
                      icon={solid("circle-info")}
                    />
                  </div>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">Engagements</p>
                    <FontAwesomeIcon
                      className="text-gray-900"
                      icon={solid("circle-info")}
                    />
                  </div>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">
                      Likes and reactions
                    </p>
                    <FontAwesomeIcon
                      className="text-gray-900"
                      icon={solid("circle-info")}
                    />
                  </div>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">Comments</p>
                    <FontAwesomeIcon
                      className="text-gray-900"
                      icon={solid("circle-info")}
                    />
                  </div>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">Shares</p>
                    <FontAwesomeIcon
                      className="text-gray-900"
                      icon={solid("circle-info")}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <ManagePostTableRows />
              <ManagePostTableRows />
              <ManagePostTableRows />
              <ManagePostTableRows />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManagePosts;
