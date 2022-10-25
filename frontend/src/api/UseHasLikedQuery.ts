import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseHasLikedQuery(post_id:number) {
	return useQuery(['hasLiked', post_id], () =>
		axios
			.get(`${GetEndpoint('api')}/hasliked/${post_id}`)
			.then((res) => res)
	)
}