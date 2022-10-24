import { Fragment, useState } from 'react'

import { UseDeletePostMutation } from '../../api/UsePostMutation'
import useAuth from '../../api/util/useAuth'
import edit from '../../images/edit-button.png'
import like from '../../images/like.png' // use this for like button (or find a new icon, then find the same icon filled in, so when you click like it becomes solid)
import trash from '../../images/trash.png'
import styles from '../../styles/Feed.module.css'
import Carousel from '../common/Carousel'
import { ContextMenu } from '../common/ContextMenu'
import CreatePostModal from '../common/CreatePostModal'
import moment from 'moment'

interface Props {
	post: Post
}

export const Post = (props: Props) => {
	const [account, _] = useAuth()
	const { post } = props

	// TODO: fetch comments
	const comments: [string, string][] = [
		[post.username, post.caption],
		['skyemcalpine', 'Making strawberry and vodka jam 🍓'],
		['kanyewest', 'Wow!!!'],
		['zuck', 'Delicious.. I have to try this!'],
	]

	const deletePostMutation = UseDeletePostMutation()
	const deletePost = () => {
		deletePostMutation.mutate({ post_id: post.post_id })
		alert('Post has been deleted, the page will reload')
		window.location.reload()
	}
	// const likePostMutation = UseLikePostMutation()
	// const likePost = () => {
	// 	likePostMutation.mutate({ post_id: post.post_id })

	// }

	const [editPostModalOpen, setEditPostModalOpen] = useState(false)
	const openEditPostModalOpen = () => setEditPostModalOpen(true)
	const closeEditPostModalOpen = () => setEditPostModalOpen(false)

	return (
		<>
			{editPostModalOpen && (
				<CreatePostModal
					open={editPostModalOpen}
					onClose={closeEditPostModalOpen}
					{...post}
				/>
			)}

			<div className="m-12 w-4/5 h-full ml-auto mr-auto flex max-w-[550px]">
				<div className={`flex-auto w-14`}>
					<div className={`py-7 px-8 bg-white border ${styles.greyBorder}`}>
						<div className="flex flex-row gap-2">
							<img
								alt="avatar"
								className="w-8 h-8 rounded-full border-2 border-gray-700 inline-block align-middle mb-4 object-cover"
								src={post.profile_picture_url}
							/>
							<a
								href={`/profile/${post.username}`}
								className="font-medium text-md text-black-500 text-left inline-block align-middle mb-4"
							>
								{post.username}
							</a>
							in {post.location_name}
							<span className="grow" />
							{post.updated_at !== null && (
								<time className="">{moment(post.created_at).fromNow()}</time>
							)}
							{post.account_id === account.account_id && (
								<ContextMenu>
									<button
										onClick={openEditPostModalOpen}
										className="inline-flex flex-row w-full p-2 items-center hover:bg-slate-100"
									>
										<img src={edit} className="h-5 inline-block pr-2" />
										<span>Edit</span>
									</button>
									<button
										onClick={deletePost}
										className="inline-flex flex-row w-fit p-2 items-center hover:bg-slate-100"
									>
										<img src={trash} className="h-5 inline-block pr-2" />
										<span>Delete</span>
									</button>
								</ContextMenu>
							)}
						</div>

						<Carousel pictures={post.image_url} />
						<br />

						<span className="flex items-center mb-4">
							<button
							// onClick={likePost}
							>
								<img alt="Like" className="h-5 inline-block pr-2" src={like} />
							</button>

							<span className="">{post.post_likes} likes</span>
						</span>

						<div>
							{comments.map((comment, index) => (
								<Fragment key={index}>
									<p className="text-sm text-black-500 font-medium text-left inline-block align-middle mb-4 mr-2">
										{comment[0]}
									</p>
									<p className="text-sm text-black-500 text-left inline-block align-middle mb-4">
										{comment[1]}
									</p>
									{index ? (
										<br />
									) : (
										<hr className="border-y-1 w-80 mb-4 mx-auto" />
									)}
								</Fragment>
							))}
						</div>

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
		</>
	)
}
