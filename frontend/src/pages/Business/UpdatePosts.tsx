import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TimePicker, { TimePickerValue } from "react-time-picker";
import Calendar from "react-calendar";
import Spinner from "../../components/common/Spinner";
import {
  UpdateBusinessPost,
  UseUpdateBusinessPostMutation,
} from "../../api/UseCreateBusinessPostMutation";
import useAuth from "../../api/util/useAuth";
import UseIndividualBusinessPostQuery from "../../api/UseIndividualBusinessPostQuery";

const UpdatePosts = () => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [publishState, setPublishState] = useState<number>(0);
  const [scheduledTime, setScheduledTime] = useState<TimePickerValue>("");
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());
  const [categories, setCategories] = useState<string>("");

  const createMutation = UseUpdateBusinessPostMutation();
  const [account, isLoading] = useAuth()

  const [postDescription, setPostDescription] = useState<string>("");
  const [postLocation, setPostLocation] = useState<string>("");

  const [postDescriptionError, setPostDescriptionError] = useState(false);
  const [postLocationError, setPostLocationError] = useState(false);
  const [postPublishStateError, setPostPublishStateError] = useState(false);


  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const { post_id } = useParams();
  let postQuery = UseIndividualBusinessPostQuery(post_id ? parseInt(post_id) : 1);

  useEffect(() => {
    console.log(postQuery);
    if(postQuery.data) {
      let data = postQuery.data.data.post[0];
      setPostDescription(data.caption)
      setPostLocation(data.location_name);
      setPreviewImage(data.post_image);
      setPublishState(data.businessState);
      setCategories(data.categories);

    }
  }, [postQuery.isLoading]);


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
          <h2 className="text-xl py-2">Edit Post</h2>
          <p className="text-md py-2">
            Share photos or a video. Foostagram posts can't exceed 10 photos.
          </p>
        
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

          {/* Catergories */}
          <div className="bg-white p-4 mb-8 border-b-[1px] stroke-light-gray">
            <h2 className="text-xl">Categories (Optional)</h2>
            <div>
              <textarea value={categories} onChange={(e) => setCategories(e.target.value)} className="my-4 w-full border-[1px] stroke-light-gray" placeholder="Enter category here (optional)..." />
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
                setPostDescriptionError(postDescription.length < 5);
                setPostLocationError(postLocation.length < 5);
                setPostPublishStateError(!(publishState >= 1 && publishState  <= 3));
                
                if(publishState >= 1 && publishState <= 3) {
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
                    caption: postDescription,
                    location: postLocation,
                    businessState: publishState,
                    post_id: post_id as any,
                    categories: categories 
                  } as UpdateBusinessPost;

                  if(publishState == 2) {
                    mutationData.dateTime = dbDateString
                  }

                  createMutation.mutate(mutationData);
              }

              }}
            >
              {createMutation.isLoading ? <Spinner /> : "Confirm"}
            </button>
          </div>
        </div>

        <div>
          <h1 className={`${postDescriptionError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Description Must Be 5 Characters Long or Greater.</h1>
          <h1 className={`${postLocationError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Description Must Be 5 Characters Long or Greater.</h1>
          <h1 className={`${postPublishStateError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Must Have A Publish State.</h1>
        </div>
      </div>
    </div>
  );
};

export default UpdatePosts;
