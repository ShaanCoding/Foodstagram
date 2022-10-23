import React from 'react'
import { useQueryClient } from 'react-query'
import { Link, Navigate, useParams } from 'react-router-dom'

import { UseBlockMutation } from '../api/UseBlockMutation'
import UseFollowerCountQuery from '../api/UseFollowerCountQuery'
import UseFollowingCountQuery from '../api/UseFollowingCountQuery'
import { UseFollowMutation } from '../api/UseFollowMutation'
import UseIsBlockedQuery from '../api/UseIsBlockedQuery'
import UseIsBlockingQuery from '../api/UseIsBlockingQuery'
import UseIsFollowingQuery from '../api/UseIsFollowingQuery'
import UsePostCountQuery from '../api/UsePostCountQuery'
import UseProfilePostsQuery from '../api/UseProfilePostsQuery'
import UseProfileQuery from '../api/UseProfileQuery'
import useAuth from '../api/util/useAuth'
import Spinner from '../components/common/Spinner'
import styles from '../styles/Profile.module.css'

const Profile = () => {
	const [account, isLoading] = useAuth()
	const param = useParams()
	const queryClient = useQueryClient()
	console.log(param)
	if (param.username === undefined) {
		return <Navigate to="/" />
	}
	const profileQuery = UseProfileQuery(param.username as string)
	const profileQueryBlank = UseProfileQuery('DEFAULTDONTDELETE')
	const postCountQuery = UsePostCountQuery(
		profileQuery.data?.data.data.account_id
	)
	const followerCountQuery = UseFollowerCountQuery(
		profileQuery.data?.data.data.account_id
	)
	const followingCountQuery = UseFollowingCountQuery(
		profileQuery.data?.data.data.account_id
	)
	const profilePostsQuery = UseProfilePostsQuery(
		profileQuery.data?.data.data.account_id
	)
	const isFollowingQuery = UseIsFollowingQuery(
		profileQuery.data?.data.data.account_id
	)
	const followMutation = UseFollowMutation(queryClient)
	const isBlockingQuery = UseIsBlockingQuery(
		profileQuery.data?.data.data.account_id
	)
	const isBlockedQuery = UseIsBlockedQuery(
		profileQuery.data?.data.data.account_id
	)
	const blockMutation = UseBlockMutation(queryClient)

	return (
		<div className="relative max-w-2xl mx-auto my-3">
			{/* top bar */}
			{profileQuery.isLoading == false && (
				<>
					<div className="flex flex-col justify-center items-center mt-5">
						<img
							alt="Profile Picture"
							className={`w-32 h-32 bg-cover bg-center bg-no-repeat rounded-full object-cover`}
							src={`${
								isBlockedQuery.data?.data.isBlocked
									? profileQueryBlank.data?.data.data.profile_picture_url
									: profileQuery.data?.data.data.profile_picture_url
							}`}
						/>
						<span className="mt-3 font-bold">
							{profileQuery.data?.data.data.name}
						</span>
						<span className="mt-1 mb-3">
							@{profileQuery.data?.data.data.username}
						</span>

						<div className="grid grid-cols-3 gap-10 text-sm mb-3">
							<div className="flex flex-col items-center">
								<span className="font-bold">
									{postCountQuery.data?.data.data.count}
								</span>
								<span>Posts</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="font-bold">
									{followerCountQuery.data?.data.data.followers}
								</span>
								<span>Followers</span>
							</div>
							<div className="flex flex-col items-center">
								<span className="font-bold">
									{followingCountQuery.data?.data.data.following}
								</span>
								<span>Following</span>
							</div>
						</div>

						{account.username === (param.username as string) && (
							<Link to="/editprofile">
								<button className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400 rounded">
									Edit profile
								</button>
							</Link>
						)}

						<div className="flex flex-row">
							{isFollowingQuery.isLoading === false &&
								account.username !== (param.username as string) && (
									<button
										onClick={() => {
											followMutation.mutate(
												profileQuery.data?.data.data.account_id
											)
										}}
										className={`${
											isFollowingQuery.data?.data.isFollowing
												? 'bg-white'
												: 'bg-insta-green text-white'
										} ${
											isBlockedQuery.data?.data.isBlocked
												? 'hidden'
												: 'px-5 mr-4'
										} my-2 py-2 font-semibold text-sm border border-gray-400 rounded`}
									>
										{followMutation.isLoading ? (
											<Spinner />
										) : isFollowingQuery.data?.data.isFollowing ? (
											'Unfollow'
										) : (
											'Follow'
										)}
									</button>
								)}
							{isBlockingQuery.isLoading === false &&
								account.username !== (param.username as string) && (
									<button
										onClick={() => {
											blockMutation.mutate(
												profileQuery.data?.data.data.account_id
											)
										}}
										className={`${
											isBlockingQuery.data?.data.isBlocking
												? 'bg-white'
												: 'bg-red-500 text-white'
										} my-2 px-5 py-2 font-semibold text-sm border border-gray-400 rounded`}
									>
										{blockMutation.isLoading ? (
											<Spinner />
										) : isBlockingQuery.data?.data.isBlocking ? (
											'Unblock'
										) : (
											'Block'
										)}
									</button>
								)}
						</div>
					</div>

					<div
						className={`${
							isBlockedQuery.data?.data.isBlocked ? 'hidden' : ''
						} relative max-w-2xl mx-auto mb-8`}
					>
						<p className="mt-2 mb-3 text-center">
							{profileQuery.data?.data.data.bio}
						</p>
					</div>
					{/* top bar end */}

					{/* post grid */}
					<div
						className={`${
							isBlockedQuery.data?.data.isBlocked ? 'hidden' : ''
						} grid grid-cols-3 gap-0.5 mt-2`}
					>
						{profilePostsQuery.isLoading === false &&
							profilePostsQuery.isSuccess &&
							profilePostsQuery.data?.data.posts?.map((post: Post) => (
								<a href={`/feed/${post.post_id}`}>
									<div className="relative w-full h-full">
										<img
											alt="Post"
											className="mb-4 w-full h-full object-cover aspect-square"
											src={post.image_url[0]}
										/>
										<div className="absolute bottom-1 left-1 flex gap-1 text-white text-xs items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 stroke-white"
												fill="red"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke="none"
													d="M0 0h24v24H0z"
													fill="none"
												></path>
												<path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
											</svg>
											<span className={`${styles.likeCounter}`}>
												{post.post_likes}
											</span>
										</div>
									</div>
								</a>
							))}
					</div>
					{/* post grid end */}
				</>
			)}
		</div>
	)
}

export default Profile
