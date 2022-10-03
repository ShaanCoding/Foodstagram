// import React from "react";
import styles from '../styles/Feed.module.css'
import like from '../images/like.png' // use this for like button (or find a new icon, then find the same icon filled in, so when you click like it becomes solid)
import save from '../images/save.png'
import useAuth from '../api/util/useAuth'
import UseFeedQuery from '../api/UseFeedQuery'
import { Post } from '../components/post/Post'

const Feed = () => {
	const [account, isLoading] = useAuth()
	const feedQuery = UseFeedQuery()
	return (
		<div>
			{feedQuery.isLoading === false &&
				feedQuery.isSuccess &&
				feedQuery.data.data.posts === undefined && (
					<h1 className="mx-auto block w-2/3 text-center mt-[200px] mb-[200px]">
						Your feed appears to be empty, we recommend you follow some more
						people!
					</h1>
				)}
			{feedQuery.isLoading === false &&
				feedQuery.isSuccess &&
				feedQuery.data.data.posts !== undefined &&
				feedQuery.data?.data.posts.map((post: Post) => <Post post={post} />)}
			<p className="text-sm text-black-500 text-left inline-block align-middle mb-4">
				No posts yet! Try following some users.
			</p>
		</div>
	)
}

export default Feed
