import { Navigate, useParams } from 'react-router-dom'
import UseFeedQuery from '../api/UseFeedQuery'
import UseGetPostQuery from '../api/UseGetPostQuery'
import useAuth from '../api/util/useAuth'
import Spinner from '../components/common/Spinner'
import { Post } from '../components/post/Post'

const SinglePost = () => {
	const param = useParams()
	const [account, isLoading] = useAuth()
	const useGetPostQuery = UseGetPostQuery(param.postID ?? '')

	if (param.postID === undefined) {
		return <Navigate to="/" />
	}
	if (
		!useGetPostQuery.isLoading &&
		useGetPostQuery.isSuccess &&
		useGetPostQuery.data.data !== undefined
	) {
		console.log(useGetPostQuery?.data.data.post)
	}
	return (
		<div>
			{useGetPostQuery.isLoading ||
				(isLoading && (
					<div className="h-[600px]">
						<Spinner />
					</div>
				))}

			{!useGetPostQuery.isLoading &&
				useGetPostQuery.isSuccess &&
				useGetPostQuery.data.data.post !== undefined && (
					<Post post={useGetPostQuery.data.data.post} />
				)}
		</div>
	)
}

export default SinglePost
