import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseProfilePostsQuery(profileID: string) {
	return useQuery(['profilePosts', profileID], () =>
		axios
			.get(`${GetEndpoint('api')}/profilePosts/${profileID}`)
			.then((res) => res)
	)
}