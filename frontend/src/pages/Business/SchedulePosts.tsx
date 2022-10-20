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

import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import UseCategoriesQuery from "../../api/UseCategoriesQuery";

const SchedulePosts = () => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [publishState, setPublishState] = useState<number>(0);
  const [scheduledTime, setScheduledTime] = useState<TimePickerValue>("");
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());
  const [categories, setCategories] = useState<string>("");

  const createMutation = UseCreateBusinessPostMutation();
  const [account, isLoading] = useAuth()

  const [postDescription, setPostDescription] = useState<string>("");
  const [postLocation, setPostLocation] = useState<string>("");

  const [imageSelectedError, setImageSelectedError] = useState(false);
  const [postDescriptionError, setPostDescriptionError] = useState(false);
  const [postLocationError, setPostLocationError] = useState(false);
  const [postPublishStateError, setPostPublishStateError] = useState(false);
  const [timePickerError, setTimePickerError] = useState(false);
  const [categoriesError, setCategoriesError] = useState(false);

  const [categoriesSuggestedList, setCategoresSuggestedList] = useState<String[]>([]);

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const categoriesQuery = UseCategoriesQuery();

  let generateCategoryColor = (str: string) => {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
		  hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = '#';
		for (var i = 0; i < 3; i++) {
		  var value = (hash >> (i * 8)) & 0xFF;
		  colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	};

  useEffect(() => {
    if(categoriesQuery.isSuccess) {
      let data = categoriesQuery.data.data.categories;
      setCategoresSuggestedList(data);
    }
  }, [categoriesQuery.isFetchedAfterMount]);

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

  function formatDate(date: any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  function formatDateFull(date: any) {
    var d = new Date(date),
        minutes = '' + d.getMinutes(),
        hours = '' + d.getHours(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    if(minutes.length < 2)
      minutes = '0' + minutes;
    
    if(hours.length < 2)
      hours = '0' + hours;
      

    return [year, month, day].join('-') + " " + hours + ":" + minutes + ":00";
}

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
          <h2 className="text-xl">Publish State</h2>
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
          <h2 className="text-xl">Suggested Tags (Click to select)</h2>
          <div className="flex items-center justify-start">
            {categoriesSuggestedList?.map(item => {
              return <button className="m-2 px-2 py-1 rounded-full hover:opacity-80" style={{backgroundColor: generateCategoryColor(item as any)}}
              onClick={() => setCategories(item as any)}>{item}</button>
            })}
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
                setImageSelectedError(!previewImage);
                setPostDescriptionError(postDescription.length < 5);
                setPostLocationError(postLocation.length < 5);
                setPostPublishStateError(!(publishState >= 1 && publishState  <= 3));
                setTimePickerError(publishState == 2 && scheduledTime == "");
                setCategoriesError(categories.length > 300);

                // Guard clauses
                if(!previewImage) {
                  return;
                }

                if(postDescription.length < 5) {
                  return; 
                }

                if(postLocation.length < 5) {
                  return;
                }

                if(!(publishState >= 1 && publishState  <= 3)) {
                  return;
                }

                if(publishState == 2 && scheduledTime == "") {
                  return;
                }

                if(categories.length > 300) {
                  return;
                }

                let data = await (await fetch(previewImage)).blob();
                let base64: any = await blobToBase64(data);
                let responseData: String = base64.replace(
                  "data:image/jpeg;base64,",
                  ""
                );

                // Scheduled date + scheduled time - 11 hours
                let scheduledDateTime = `${formatDate(scheduledDate)} ${scheduledTime}:00`;
                let scheduledDateTimeUTC = new Date(scheduledDateTime);
                scheduledDateTimeUTC.setHours(scheduledDateTimeUTC.getHours() - 11);
                let dbDateString = `${formatDateFull(scheduledDateTimeUTC)}`;


                let mutationData = {
                  picture: responseData,
                  caption: postDescription,
                  location: postLocation,
                  businessState: publishState,
                  dateTime: dbDateString,
                  account_id: account.account_id,
                  categories: categories,
                } as CreateNewBusinessPost;

                createMutation.mutate(mutationData);
              }}
            >
              {createMutation.isLoading ? <Spinner /> : "Confirm"}
            </button>
          </div>
        </div>

        <div className="px-4">
          <h1 className={`${imageSelectedError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Must Have A Image Selected.</h1>
          <h1 className={`${postDescriptionError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Description Must Be 5 Characters Long or Greater.</h1>
          <h1 className={`${postLocationError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Description Must Be 5 Characters Long or Greater.</h1>
          <h1 className={`${postPublishStateError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Must Have A Publish State.</h1>
          <h1 className={`${timePickerError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Must Have A Time Selected.</h1>
          <h1 className={`${categoriesError ? "block" : "hidden"} text-red-600 text-xl py-2`}>Error Post Must Have A Category Description Less Than 300 Characters Long.</h1>
        </div>
      </div>
    </div>
  );
};

export default SchedulePosts;
