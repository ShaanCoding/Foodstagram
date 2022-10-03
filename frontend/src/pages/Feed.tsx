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
				feedQuery.data?.data.posts.map((post: Post) => (
					<div className="m-12 w-4/5 h-full ml-auto mr-auto flex max-w-[550px]">
						<div className={`flex-auto w-14`}>
							<div className={`py-7 px-8 bg-white border ${styles.greyBorder}`}>
								<img
									alt="avatar"
									className="w-8 h-8 rounded-full border-2 border-gray-700 inline-block align-middle mb-4"
									src={post.profile_picture_url}
								/>
								<a
									href={"/profile/" + post.username}
									className="font-medium text-md text-black-500 text-left inline-block ml-4 align-middle mb-4"
								>
									{post.username}
								</a>
								<img alt="Post" className="mb-4" src={post.post_image} />
								<span className="flex items-stretch">
									<img
										alt="Like"
										className="mb-4 h-5 inline-block pr-5"
										src={like}
									/>

									<img
										alt="Save"
										className="mb-4 h-5 inline-block"
										src={save}
									/>
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
				))}
		</div>
	)
}

export default Feed
