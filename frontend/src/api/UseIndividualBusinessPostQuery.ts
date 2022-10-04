import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseIndividualBusinessPostQuery(post_id: number) {
	return useQuery(['individualPost', post_id], () =>
		axios
			.get(`${GetEndpoint('api')}/viewBusinessPosts/${post_id}`)
			.then((res) => res)
	)
}