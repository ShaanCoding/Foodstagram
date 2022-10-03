import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimePicker, { TimePickerValue } from "react-time-picker";
import Calendar from "react-calendar";
import Spinner from "../../components/common/Spinner";
import {
  CreateNewBusinessPost,
  UseCreateBusinessPostMutation,
} from "../../api/UseCreateBusinessPostMutation";
import useAuth from "../../api/util/useAuth";

const SchedulePosts = () => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [publishState, setPublishState] = useState<number>(0);
  const [scheduledTime, setScheduledTime] = useState<TimePickerValue>("");
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());

  const createMutation = UseCreateBusinessPostMutation();
  const [account, isLoading] = useAuth()

  const [postDescription, setPostDescription] = useState<string>("");
  const [postLocation, setPostLocation] = useState<string>("");

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick = (event: any) => {
    if (hiddenFileInput.current != null) {
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    // Probs should upload soon
    console.log(fileUploaded);
    let previewImage = URL.createObjectURL(fileUploaded);
    setPreviewImage(previewImage);
  };

  function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

	const navigate = useNavigate()

  useEffect(() => {
    if(createMutation.isSuccess)
      navigate('/manageposts')
  }, [createMutation.isLoading]);

  return (
    <div className="mx-16 py-3 border-[1px] stroke-light-gray rounded-2xl">
      <div className="my-3">
        {/* Media type */}
        <div className="bg-white p-4 mb-8 border-b-[1px] stroke-light-gray">
          <h2 className="text-xl py-2">Media</h2>
          <p className="text-md py-2">
            Share photos or a video. Foostagram posts can't exceed 10 photos.
          </p>
          <div
            className={`flex items-center justify-start ${
              previewImage !== "" || previewImage !== null ? "block" : "hidden"
            }`}
          >
            <button
              onClick={handleClick}
              className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 bg-slate-200`}
            >
              Add Photo
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {/* <button
              className={`text-black font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-slate-200`}
            >
              Add Video
            </button> */}
          </div>
          <div
            className={`flex items-center justify-center ${
              previewImage !== "" || previewImage !== null ? "block" : "block"
            }`}
          >
            <img src={previewImage} className="w-1/2 h-auto" />
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
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
          />
          <p className="text-md py-2">Location</p>
          <textarea
            className="w-full border-[1px] stroke-light-gray"
            value={postLocation}
            onChange={(e) => setPostLocation(e.target.value)}
          />
        </div>

        {/* Scheduling options */}
        <div className="flex items-center justify-between bg-white p-4 mb-8 border-b-[1px] stroke-light-gray">
          <h2 className="text-xl">Media</h2>
          <div className="flex items-center justify-center">
            <div>
              <button
                className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 ${
                  publishState == 1 ? "bg-insta-green" : "bg-slate-200"
                }`}
                onClick={() => setPublishState(1)}
              >
                Publish now
              </button>
            </div>
            <div>
              <button
                className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 ${
                  publishState == 2 ? "bg-insta-green" : "bg-slate-200"
                }`}
                onClick={() => setPublishState(2)}
              >
                Schedule
              </button>
            </div>
            <div>
              <button
                className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 ${
                  publishState == 3 ? "bg-insta-green" : "bg-slate-200"
                }`}
                onClick={() => setPublishState(3)}
              >
                Save as draft
              </button>
            </div>
          </div>
        </div>

        {/* If is scheduled */}
        <div
          className={`bg-white p-4 mb-8 border-b-[1px] stroke-light-gray ${
            publishState == 2 ? "block" : "hidden"
          }`}
        >
          <h2 className="text-xl">Scheduled Release Date</h2>
          <p className="text-md py-2">
            Please enter the time you wish for your post to be released
          </p>
          <div className="">
            <Calendar
              onChange={setScheduledDate}
              value={scheduledDate}
              className="bg-gray-50 p-4 w-2/3 m-4"
            />
            <TimePicker
              onChange={setScheduledTime}
              value={scheduledTime}
              className="w-1/3 m-4"
            />
          </div>
        </div>

        <div className="flex items-center justify-end bg-white p-4 mb-8 border-b-[1px] stroke-light-gray">
          <div>
            <Link to="/manageposts">
              <button
                className={`text-black font-semibold py-1 px-2 rounded-sm mr-2 opacity-50 hover:opacity-100 bg-slate-200`}
              >
                Cancel
              </button>
            </Link>
          </div>
          <div>
            <button
              className={`text-black font-semibold py-1 px-2 rounded-sm opacity-50 hover:opacity-100 bg-insta-green`}
              onClick={async () => {
                if(publishState >= 1 && publishState <= 3) {
                  let data = await (await fetch(previewImage)).blob();
                  let base64: any = await blobToBase64(data);
                  let responseData: String = base64.replace(
                    "data:image/jpeg;base64,",
                    ""
                  );

                  let dbDateString = "";
                  dbDateString += scheduledDate.getFullYear();
                  dbDateString += "-"

                  if(scheduledDate.getDay() < 10) {
                    dbDateString += "0";
                  }
                  dbDateString += scheduledDate.getDay();
                  dbDateString += "-";

                  if(scheduledDate.getMonth() < 10) {
                    dbDateString += "0";
                  }
                  dbDateString += scheduledDate.getMonth();
                
                  dbDateString += ` ${scheduledTime}:00`

                  console.log(account);

                  let mutationData = {
                    picture: responseData,
                    caption: postDescription,
                    location: postLocation,
                    businessState: publishState,
                    dateTime: dbDateString,
                    account_id: account.account_id,
                  } as CreateNewBusinessPost;

                  createMutation.mutate(mutationData);
              }

              }}
            >
              {createMutation.isLoading ? <Spinner /> : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePosts;
