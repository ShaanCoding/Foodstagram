import { Fragment } from 'react'

import { UseDeletePostMutation } from '../../api/UsePostMutation'
import useAuth from '../../api/util/useAuth'
import edit from '../../images/edit-button.png'
import like from '../../images/like.png' // use this for like button (or find a new icon, then find the same icon filled in, so when you click like it becomes solid)
import save from '../../images/save.png'
import trash from '../../images/trash.png'
import styles from '../../styles/Feed.module.css'
import { ContextMenu } from '../common/ContextMenu'

interface Props {
	post: {
		post_id: number;
		account_id: number;
		username: string;
		profile_picture_url: string;
		location_name: string;
		location_lat: string;
		location_long: string;
		caption: string;
		created_at: string;
		updated_at: string;
		post_image: string;
	}
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
		alert("Post has been deleted, the page will reload")
		window.location.reload()
	}

	const editPost = () => {}
	// UseUpdatePostMutation

	return (
		<div className="m-12 w-4/5 h-full ml-auto mr-auto flex max-w-[550px]">
			<div className={`flex-auto w-14`}>
				<div className={`py-7 px-8 bg-white border ${styles.greyBorder}`}>
					<div className="flex flex-row gap-2">
						<img
							alt="avatar"
							className="w-8 h-8 rounded-full border-2 border-gray-700 inline-block align-middle mb-4"
							src={post.profile_picture_url}
						/>
						<a
							href={`/user/${post.username}`}
							className="font-medium text-md text-black-500 text-left inline-block align-middle mb-4"
						>
							{post.username}
						</a>
						in {post.location_name}
						<span className="grow" />
						{post.account_id === account.account_id && (
							<ContextMenu>
								{/*
									<button onClick={editPost}>
										<img src={edit} className="mb-4 h-5 inline-block pr-5" />
										Edit
									</button>
								*/}
								<button onClick={deletePost} className="">
									<img src={trash} className="mb-4 h-5 inline-block pr-5" />
									Delete
								</button>
							</ContextMenu>
						)}
					</div>

					<img
						alt={`Post ${post.post_id}`}
						className="mb-4 w-full"
						src={post.post_image}
					/>

					{/* Add like and maybe comment buttons here. Then add a save button on the right hand side*/}
					<span className="flex items-stretch">
						<img alt="Like" className="mb-4 h-5 inline-block pr-5" src={like} />
						<img alt="Save" className="mb-4 h-5 inline-block" src={save} />
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
	)
}
