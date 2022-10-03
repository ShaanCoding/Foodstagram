// import React from "react";
import styles from '../styles/Feed.module.css'
import post1 from '../images/post1.jpg'
import avatar1 from '../images/avatar1.jpg'
import post2 from '../images/post2.jpg'
import avatar2 from '../images/avatar2.jpg'
import post3 from '../images/post3.jpg'
import avatar3 from '../images/avatar3.jpg'
import like from '../images/like.png' // use this for like button (or find a new icon, then find the same icon filled in, so when you click like it becomes solid)
import save from '../images/save.png'
import useAuth from '../api/util/useAuth'
import UseFeedQuery from '../api/UseFeedQuery'
// import posts from './db.json'


const Feed = () => {
	const [account, isLoading] = useAuth()
	const feedQuery = UseFeedQuery()
	return (
		<div>
			{feedQuery.isLoading === false && feedQuery.isSuccess &&(
			feedQuery.data?.data.posts.map((post:Post) => (
					
			<div className="m-12 w-4/5 h-full ml-auto mr-auto flex max-w-[550px]">
				<div className={`flex-auto w-14`}>
					<div className={`py-7 px-8 bg-white border ${styles.greyBorder}`}>
						<img
							alt="avatar"
							className="w-8 h-8 rounded-full border-2 border-gray-700 inline-block align-middle mb-4"
							src={post.profile_picture_url}
						/>
						<a
							href="/user/{post.username}"
							className="font-medium text-md text-black-500 text-left inline-block ml-4 align-middle mb-4"
						>
							{post.username}
						</a>
						<img alt="Post 1" className="mb-4" src={post.post_image} />

						{/* Add like and maybe comment buttons here. Then add a save button on the right hand side*/}
						<span className="flex items-stretch">
							<img
								alt="Like"
								className="mb-4 h-5 inline-block pr-5"
								src={like}
							/>

							<img alt="Save" className="mb-4 h-5 inline-block" src={save} />
						</span>

						<p className="text-sm text-black-500 font-medium text-left inline-block align-middle mb-4 mr-2">
							{post.username} says:
						</p>
						<p className="text-sm text-black-500 text-left inline-block align-middle mb-4">
							{post.caption}
						</p>


						<form className="flex flex-row">
							<label className="flex-auto block p-1 bg-gray-100 rounded-xl">
								<input
									className="pl-2 w-full bg-transparent p-0 text-sm  text-gray-500 focus:outline-none"
									id="name"
									type="text"
									placeholder="Type a comment..."
								/>
							</label>
							<button
								className="ml-1 bg-insta-green text-white text-sm p-[7px] rounded-md font-medium inline-block h-auto w-1/6"
								type="submit"
							>
								Post
							</button>
						</form>
					</div>
				</div>
			</div>
			))
			)}
		<p className="text-sm text-black-500 text-left inline-block align-middle mb-4">No posts yet! Try following some users.</p>
		</div>
	)
}

export default Feed
