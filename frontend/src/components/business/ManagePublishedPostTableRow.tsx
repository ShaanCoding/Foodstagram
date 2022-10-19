import React from "react";
import { getDefaultState } from "react-query/types/core/mutation";

const ManagePublishedPostTableRow: React.FC<{image: string, title: string, datePublished: string, username: string, post_id: number, likes: number, comments: number, views: number, deletePost: any, profilePicture: string, updatePost: any, category?: string, categoryColor?: string}>
= ({image, title, datePublished, username, post_id, likes, comments, views, deletePost, profilePicture, updatePost, category, categoryColor}) => {
  
  let getDate = () => {
    let date = new Date(datePublished);
    return `${date.getDay()}/${date.getMonth()} ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  console.log("Test " + categoryColor)

  return (
    <tr className="">
      <td colSpan={1}>
        <input type="checkbox"></input>
      </td>
      <td colSpan={8}>
        <div className="block xl:flex items-center justify-between">
          <div className="flex items-center justify-start">
            <img className="rounded-sm w-12 h-12 mr-4" src={image} />
            <div>
              <div className="">{title}</div>
              <div className="flex items-center justify-start">
                <img className="rounded-full w-4 h-4 mr-2" src={profilePicture} />
                <p>{username}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center xl:justify-end my-4 xl:my-0">
          <div className="mr-2">
              <button className="font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-slate-100  text-sm border-[1px] border-light-gray"
              onClick={() => {updatePost(post_id)}}>
                ...
              </button>
            </div>
            <div className="mr-2">
              <button className="font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-slate-100  text-sm border-[1px] border-light-gray"
              onClick={() => {deletePost(post_id)}}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </td>
      <td colSpan={4}>
        <p className="text-sm">{getDate()}</p>
      </td>
      <td colSpan={4}>
        <div>
          <p className="text-sm">{views}</p>
          <p className="text-xs">People reached</p>
        </div>
      </td>
      <td colSpan={4}>
        <p className="text-sm">--</p>
      </td>
      <td colSpan={4}>
        <div>
          <p className="text-sm">{likes}</p>
          <p className="text-xs">Likes</p>
        </div>
      </td>
      <td colSpan={4}>
        <div>
          <p className="text-sm">{comments}</p>
          <p className="text-xs">Comments</p>
        </div>
      </td>
      <td colSpan={4}>
        <div>
          <p className="text-sm px-2 py-1 rounded-full text-center" style={{backgroundColor: categoryColor}}>{category ? category : "--"}</p>
        </div>
      </td>
    </tr>
  );
};

export default ManagePublishedPostTableRow;
