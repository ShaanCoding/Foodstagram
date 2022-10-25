import { Fragment, useState } from 'react'
import { useQueryClient } from 'react-query'
import { Link, Navigate, useParams } from 'react-router-dom'
import { UseDeletePostMutation } from '../../api/UsePostMutation'
import useAuth from '../../api/util/useAuth'
import edit from '../../images/edit-button.png'
import like from '../../images/like.png' // use this for like button (or find a new icon, then find the same icon filled in, so when you click like it becomes solid)
import liked from '../../images/liked.png'
import location from '../../images/location.png'
import trash from '../../images/trash.png'
import styles from '../../styles/Feed.module.css'
import Carousel from '../common/Carousel'
import { ContextMenu } from '../common/ContextMenu'
import CreatePostModal from '../common/CreatePostModal'
import moment from 'moment'
import UseLikeCountQuery from '../../api/UseLikeCountQuery'
import { UseLikeMutation } from '../../api/UseLikeMutation'
import UseHasLikedQuery from '../../api/UseHasLikedQuery'
import UsePostQuery from '../../api/UsePostQuery'


interface Props {
	post: Post
}

export const Post = (props: Props) => {
	const [account, _] = useAuth()
	const { post } = props
	const param = useParams()
	const queryClient = useQueryClient()

	// TODO: fetch comments
	const comments: [string, string][] = [
		[post.username, post.caption],
		['skyemcalpine', 'This is cool.'],
		['kanyewest', 'Wow!!!'],
		['zuck', 'Delicious.. I have to try this!'],
	]

	const deletePostMutation = UseDeletePostMutation()
	const deletePost = () => {
		deletePostMutation.mutate({ post_id: post.post_id })
		alert('Post has been deleted, the page will reload')
		window.location.reload()
	}
	const postQuery = UsePostQuery(param.post_id as unknown as number)
	const likeCountQuery = UseLikeCountQuery(
		postQuery.data?.data.data.post_id
	)
	const hasLikedQuery = UseHasLikedQuery(
		postQuery.data?.data.data.post_id
	)
	const likeMutation = UseLikeMutation(queryClient)

	const [editPostModalOpen, setEditPostModalOpen] = useState(false)
	const openEditPostModalOpen = () => setEditPostModalOpen(true)
	const closeEditPostModalOpen = () => setEditPostModalOpen(false)
	// const hasLikedQuery = UseHasLikedQuery(
	// 	profileQuery.data?.data.data.account_id
	// )

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
						<div className="flex items-center mb-4 gap-3">
							<img
								alt="avatar"
								className="w-8 h-8 rounded-full border-2 border-gray-700 inline-block align-middle object-cover"
								src={post.profile_picture_url}
							/>
							<a
								href={`/profile/${post.username}`}
								className="font-medium text-md text-black-500 text-left inline-block align-middle"
							>
								{post.username}
							</a>
							<span className="grow" />
							<span>
								{post.created_at !== null && (
								<time className="text-sm">{moment(post.created_at).fromNow()}</time>
							)}
							{post.updated_at !== post.created_at && (
								<time className="italic text-xs text-gray-600 pl-1">(edited {moment(post.updated_at).fromNow()})</time>
							)}
							</span>
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
						<br/>
						<span className="flex items-center mb-4 h-5">
						{/*  */}
						<img
						className="h-5 mr-2"
						alt="Like button"
							onClick={() => {
								likeMutation.mutate(
									postQuery.data?.data.data.post_id
								)
							}}
							// src={`${
							// 	hasLikedQuery.data?.data.hasLiked
							// 		? {like}
							// 		: {liked}
							// }`}
							src={like}
						>
									</img>
							{/*  */}

							<span className="">{post.post_likes} likes</span>
							<span className="grow"/>
							<img alt="Location" className="h-7 inline-block pr-1" src={location} />
								<a className="flex text-sm">in {post.location_name}</a>
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
