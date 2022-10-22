import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseHasLikedQuery(account_id:string) {
	return useQuery(['hasLiked', account_id], () =>
		axios
			.get(`${GetEndpoint('api')}/hasliked/${account_id}`)
			.then((res) => res)
	)
}