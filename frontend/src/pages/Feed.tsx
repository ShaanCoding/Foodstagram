import useAuth from '../api/util/useAuth'
import UseFeedQuery from '../api/UseFeedQuery'
import { Post } from '../components/post/Post'
import Spinner from '../components/common/Spinner'

const Feed = () => {
	const [account, isLoading] = useAuth()
	const feedQuery = UseFeedQuery()
	return (
		<div>
			{feedQuery.isLoading ||
				(isLoading && (
					<div className="h-[600px]">
						<Spinner />
					</div>
				))}
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
		</div>
	)
}

export default Feed
