import axios from 'axios'
import { useQuery } from 'react-query'

import { PostProps } from "../components/post/Post"
import GetEndpoint from './util/GetEndpoint'

export default function FeedQuery() {
	return useQuery<PostProps[]>(
		['feed'],
		() => axios.get(`${GetEndpoint('api')}/feed`).then(({ data }) => data),
		{ retry: false }
	)
}
