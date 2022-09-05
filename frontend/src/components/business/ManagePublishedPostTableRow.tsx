import React from "react";
import exampleEvent from "../../images/business/exampleEvent.png";
import exampleLogo from "../../images/business/progSocLogo.png";

const ManagePublishedPostTableRow = () => {
  return (
    <tr className="">
      <td colSpan={1}>
        <input type="checkbox"></input>
      </td>
      <td colSpan={8}>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <img className="rounded-sm w-12 h-12 mr-4" src={exampleEvent} />
            <div>
              <div className="whitespace-nowrap">Introduction to Docker</div>
              <div className="flex items-center justify-start">
                <img className="rounded-full w-4 h-4 mr-2" src={exampleLogo} />
                <p>progsoc_uts</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="mr-2">
              <button className="font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-slate-100 whitespace-nowrap text-sm border-[1px] border-light-gray">
                Boost post
              </button>
            </div>
            <div className="mr-2">
              <button className="font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-slate-100 whitespace-nowrap text-sm border-[1px] border-light-gray">
                ...
              </button>
            </div>
          </div>
        </div>
      </td>
      <td colSpan={4}>
        <p className="text-sm">Wed Aug 31, 3:17pm</p>
      </td>
      <td colSpan={4}>
        <div>
          <p className="text-sm">6</p>
          <p className="text-xs">People reached</p>
        </div>
      </td>
      <td colSpan={4}>
        <p className="text-sm">--</p>
      </td>
      <td colSpan={4}>
        <div>
          <p className="text-sm">6</p>
          <p className="text-xs">Likes</p>
        </div>
      </td>
      <td colSpan={4}>
        <div>
          <p className="text-sm">6</p>
          <p className="text-xs">Comments</p>
        </div>
      </td>
      <td colSpan={4}>
        <div>
          <p className="text-sm">6</p>
          <p className="text-xs">Shares</p>
        </div>
      </td>
    </tr>
  );
};

export default ManagePublishedPostTableRow;
