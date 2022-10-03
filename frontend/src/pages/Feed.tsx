// import posts from './db.json'
import FeedQuery from "../api/UseFeedQuery";
// import React from "react";
import { Post, PostProps }  from "../components/post/Post"

const Home = () => {
	const { data, isLoading } = FeedQuery();
	return (
		<div>
			{
				data?.length
					? data?.map(el => <Post key={el.post_id} {...el} />)
					: <h1>No posts yet</h1>
			}
		</div>
	)
}

export default Home
