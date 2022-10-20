import React from "react";

const ManageScheduledPostTableRow: React.FC<{image: string, title: string, dateScheduled: string, username: string, post_id: number, deletePost: any, profilePicture: string, updatePost: any, category?: string, categoryColor?: string}> = ({image, title, dateScheduled, username, post_id, deletePost, profilePicture, updatePost, category, categoryColor}) => {
  
  let getDate = () => {
    let date = new Date(dateScheduled);
    date.setHours(date.getHours() + 11);
    return `${date}`
  }
  
  return (
    <tr className="">
      <td colSpan={8}>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <img className="rounded-sm w-12 h-12 mr-4" src={image} />
            <div>
              <div className="">{title}</div>
            </div>
          </div>
          <div className="flex items-center justify-end">
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
      <td colSpan={8}>
        <p className="text-sm">{getDate()}</p>
      </td>
      <td colSpan={4}>
        <div className="flex items-center justify-start">
          <img className="rounded-full w-4 h-4 mr-2" src={profilePicture} />
          <p>{username}</p>
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

export default ManageScheduledPostTableRow;
