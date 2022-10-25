import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function PostQuery(post_id: number) {
	return useQuery(['post', post_id], () =>
		axios
			.get(`${GetEndpoint('api')}/post/${post_id}`)
			.then((res) => res)
	)
}