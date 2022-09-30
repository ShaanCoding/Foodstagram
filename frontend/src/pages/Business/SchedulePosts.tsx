import React from "react";

const SchedulePosts = () => {
  return (
    <div className="mx-16 py-3 border-[1px] stroke-light-gray rounded-2xl">
      <div className="my-3">
        {/* Media type */}
        <div className="bg-white p-4 mb-8 border-b-[1px] stroke-light-gray">
          <h2 className="text-xl py-2">Media</h2>
          <p className="text-md py-2">
            Share photos or a video. Foostagram posts can't exceed 10 photos.
          </p>
          <div className="flex items-center justify-start">
            <button
              className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 bg-slate-200`}
            >
              Add Photo
            </button>
            <button
              className={`text-black font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-slate-200`}
            >
              Add Video
            </button>
          </div>
        </div>

        {/* Post details */}
        <div className="bg-white p-4 mb-8 border-b-[1px] stroke-light-gray">
          <h2 className="text-xl py-2">Post details</h2>
          <p className="text-md py-2">
            Write a post description for what will be displayed.
          </p>
          <textarea
            className="w-full border-[1px] stroke-light-gray"
            rows={8}
          />
        </div>

        {/* Scheduling options */}
        <div className="flex items-center justify-between bg-white p-4 mb-8 border-b-[1px] stroke-light-gray">
          <h2 className="text-xl">Media</h2>
          <div className="flex items-center justify-center">
            <div>
              <button
                className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 bg-slate-200`}
              >
                Publish now
              </button>
            </div>
            <div>
              <button
                className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 bg-slate-200`}
              >
                Schedule
              </button>
            </div>
            <div>
              <button
                className={`text-black font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-slate-200`}
              >
                Save as draft
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end bg-white p-4 mb-8 border-b-[1px] stroke-light-gray">
          <div>
            <button
              className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 bg-slate-200`}
            >
              Cancel
            </button>
          </div>
          <div>
            <button
              className={`text-black font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-insta-green`}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePosts;
