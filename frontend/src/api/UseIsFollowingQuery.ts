import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseIsFollowingQuery(account_id:string) {
	return useQuery(['isFollowing', account_id], () =>
		axios
			.get(`${GetEndpoint('api')}/isfollowing/${account_id}`)
			.then((res) => res)
	)
}