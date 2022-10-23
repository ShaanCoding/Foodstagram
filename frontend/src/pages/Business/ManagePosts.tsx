import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UseBusinessPostQuery from "../../api/UseBusinessPostQuery";
import { UseDeletePostMutation } from "../../api/UsePostMutation";
import useAuth from "../../api/util/useAuth";
import ManageDraftPostTableRow from "../../components/business/ManageDraftsPostTableRow";
import ManageScheduledPostTableRow from "../../components/business/ManageScheduledPostTableRow";
import ManagePublishedPostTableRow from "../../components/business/ManagePublishedPostTableRow";
import Spinner from "../../components/common/Spinner";

const ManagePosts = () => {
  const [openTab, setOpenTab] = useState("published");

  const [account, isLoading] = useAuth();
  let viewPostsQuery = UseBusinessPostQuery();

  const [publishedTable, setPublishedTable] = useState<any>();
  const [scheduleTable, setScheduleTable] = useState<any>();
  const [draftTable, setDraftTable] = useState<any>();

  const [listOfCategories, setListOfCategories] = useState<any>();
  const [categories, setCategories] = useState<any>("Nothing");

  const [searchBar, setSearchBar] = useState<any>("");

  let deleteMutation = UseDeletePostMutation();

  let generateCategoryColor = (str: string) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  };

  let generatePublishedTable = () => {
    if (viewPostsQuery.isSuccess) {
      let data = viewPostsQuery.data.data.posts;

      data = data?.sort((a: any, b: any) => b.views - a.views);

      let generatedTable: any[] = [];
      if (data !== undefined) {
        data.forEach((element: any) => {
          let searchBarFilter =
            element.caption.toLowerCase().includes(searchBar.toLowerCase()) ||
            searchBar == "";
          if (
            element.businessState == 1 &&
            (element.categories == categories || categories == "Nothing") &&
            searchBarFilter
          ) {
            // image: string, title: string, datePublished: string, username: string, post_id: number, likes: number, comments: number, views: number

            if (element.categories) {
              generatedTable.push(
                <ManagePublishedPostTableRow
                  image={element?.image_url[0]}
                  title={element.caption}
                  datePublished={element.updated_at}
                  username={element.username}
                  post_id={element.post_id}
                  likes={element.post_likes}
                  comments={element.commentsCount}
                  views={element.views}
                  deletePost={deleteFunction}
                  profilePicture={element.profile_picture_url}
                  updatePost={updateFunction}
                  category={element.categories}
                  categoryColor={generateCategoryColor(element.categories)}
                  key={element.post_id}
                />
              );
            } else {
              generatedTable.push(
                <ManagePublishedPostTableRow
                  image={element?.image_url[0]}
                  title={element.caption}
                  datePublished={element.updated_at}
                  username={element.username}
                  post_id={element.post_id}
                  likes={element.post_likes}
                  comments={element.commentsCount}
                  views={element.views}
                  deletePost={deleteFunction}
                  profilePicture={element.profile_picture_url}
                  updatePost={updateFunction}
                  key={element.post_id}
                />
              );
            }
          }
        });
      }

      setPublishedTable(generatedTable);
    }
  };

  let generateScheduledTable = () => {
    if (viewPostsQuery.isSuccess) {
      let data = viewPostsQuery.data.data.posts;
      let generatedTable: any[] = [];
      if (data !== undefined) {
        data.forEach((element: any) => {
          let searchBarFilter =
            element.caption.toLowerCase().includes(searchBar.toLowerCase()) ||
            searchBar == "";
          if (
            element.businessState == 2 &&
            (element.categories == categories || categories == "Nothing") &&
            searchBarFilter
          ) {
            if (element.categories) {
              generatedTable.push(
                <ManageScheduledPostTableRow
                  image={element?.image_url[0]}
                  title={element.caption}
                  dateScheduled={element.businessScheduleTime}
                  username={element.username}
                  post_id={element.post_id}
                  deletePost={deleteFunction}
                  profilePicture={element.profile_picture_url}
                  updatePost={updateFunction}
                  category={element.categories}
                  categoryColor={generateCategoryColor(element.categories)}
                  key={element.post_id}
                />
              );
            } else {
              generatedTable.push(
                <ManageScheduledPostTableRow
                  image={element?.image_url[0]}
                  title={element.caption}
                  dateScheduled={element.businessScheduleTime}
                  username={element.username}
                  post_id={element.post_id}
                  deletePost={deleteFunction}
                  profilePicture={element.profile_picture_url}
                  updatePost={updateFunction}
                  key={element.post_id}
                />
              );
            }
          }
        });
      }

      setScheduleTable(generatedTable);
    }
  };

  let generateDraftTable = () => {
    if (viewPostsQuery.isSuccess) {
      let data = viewPostsQuery.data.data.posts;
      let generatedTable: any[] = [];
      if (data !== undefined) {
        data.forEach((element: any) => {
          let searchBarFilter =
            element.caption.toLowerCase().includes(searchBar.toLowerCase()) ||
            searchBar == "";
          if (
            element.businessState == 3 &&
            (element.categories == categories || categories == "Nothing") &&
            searchBarFilter
          ) {
            if (element.categories) {
              generatedTable.push(
                <ManageDraftPostTableRow
                  image={element?.image_url[0]}
                  title={element.caption}
                  dateCreated={element.created_at}
                  username={element.username}
                  post_id={element.post_id}
                  deletePost={deleteFunction}
                  profilePicture={element.profile_picture_url}
                  updatePost={updateFunction}
                  category={element.categories}
                  categoryColor={generateCategoryColor(element.categories)}
                  key={element.post_id}
                />
              );
            } else {
              generatedTable.push(
                <ManageDraftPostTableRow
                  image={element?.image_url[0]}
                  title={element.caption}
                  dateCreated={element.created_at}
                  username={element.username}
                  post_id={element.post_id}
                  deletePost={deleteFunction}
                  profilePicture={element.profile_picture_url}
                  updatePost={updateFunction}
                  key={element.post_id}
                />
              );
            }
          }
        });
      }

      setDraftTable(generatedTable);
    }
  };

  let deleteFunction = (post_id: number) => {
    deleteMutation.mutate({ post_id: post_id });
    viewPostsQuery.refetch();
  };

  const navigate = useNavigate();

  let updateFunction = (post_id: number) => {
    navigate(`/updateposts/${post_id}`);
  };

  useEffect(() => {
    generatePublishedTable();
    generateScheduledTable();
    generateDraftTable();

    // Get list of categories and store in state unique
    if (viewPostsQuery.isSuccess) {
      let data = viewPostsQuery.data.data.posts;
      let uniques = [
        ...new Set(data?.map((element: any) => element.categories)),
      ].filter((element: any) => element !== null);
      setListOfCategories(uniques);
    }
  }, [
    viewPostsQuery.isFetchedAfterMount,
    viewPostsQuery.data,
    deleteMutation.isSuccess,
    categories,
    searchBar,
  ]);

  return (
    <div className="mx-16">
      {viewPostsQuery.isLoading ||
        (isLoading && (
          <div className="h-[600px]">
            <Spinner />
          </div>
        ))}

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
        <div className="flex items-center justify-start py-4 w-full">
          <div className="flex items-center justify-start w-2/3">
            <div className="flex items-center justify-start w-1/3">
              <p className="text-sm font-semibold mr-4">Filter by category:</p>
              <select
                onChange={(e) => {
                  setCategories(e.target.value);
                }}
              >
                {listOfCategories?.map((element: any) => {
                  if (element != "") return <option>{element}</option>;
                })}
                <option>Nothing</option>
              </select>
            </div>
            <div className="flex justify-start items-center relative mr-2 w-2/3">
              <input
                className="w-full px-4 border-[1px] border-light-gray py-2 rounded-md"
                type="text"
                placeholder="Search for post"
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end items-center w-1/3">
            <Link to="/scheduleposts">
              <div className="flex items-center justify-end relative">
                <button className="px-4 bg-insta-green rounded-[5px] text-white p-2 opacity-90 hover:opacity-100">
                  Create Post
                </button>
              </div>
            </Link>
          </div>
        </div>

        {openTab == "published" && (
          <table className="table-fixed w-full overflow-hidden">
            <thead>
              <tr>
                <th className="text-left" colSpan={8}>
                  <p className="text-sm font-semibold mr-2">Title</p>
                </th>
                <th className="text-left" colSpan={8}>
                  <p className="text-sm font-semibold mr-2">Date published</p>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">Reach</p>
                  </div>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">Engagements</p>
                  </div>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">
                      Likes and reactions
                    </p>
                  </div>
                </th>
                <th className="text-left" colSpan={4}>
                  <div className="flex items-center justify-start">
                    <p className="text-sm font-semibold mr-2">Comments</p>
                  </div>
                </th>
                <th className="text-center" colSpan={4}>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-semibold mr-2">Categories</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>{publishedTable}</tbody>
          </table>
        )}

        {openTab == "scheduled" && (
          <table className="table-fixed w-full overflow-hidden">
            <thead>
              <tr>
                <th className="text-left" colSpan={8}>
                  <p className="text-sm font-semibold mr-2">Title</p>
                </th>
                <th className="text-left" colSpan={8}>
                  <p className="text-sm font-semibold mr-2">Date scheduled</p>
                </th>
                <th className="text-left" colSpan={4}>
                  <p className="text-sm font-semibold mr-2">Created by</p>
                </th>
                <th className="text-center" colSpan={4}>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-semibold mr-2">Categories</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>{scheduleTable}</tbody>
          </table>
        )}

        {openTab == "drafts" && (
          <table className="table-fixed w-full overflow-hidden">
            <thead>
              <tr>
                <th className="text-left" colSpan={8}>
                  <p className="text-sm font-semibold mr-2">Title</p>
                </th>
                <th className="text-left" colSpan={8}>
                  <p className="text-sm font-semibold mr-2">Date created</p>
                </th>
                <th className="text-left" colSpan={4}>
                  <p className="text-sm font-semibold mr-2">Created by</p>
                </th>
                <th className="text-center" colSpan={4}>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-semibold mr-2">Categories</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>{draftTable}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManagePosts;
