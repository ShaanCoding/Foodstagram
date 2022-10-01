import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function FollowingCountQuery(profileid: string) {
	return useQuery(['followingCount', profileid], () =>
		axios
			.get(`${GetEndpoint('api')}/followingCount`)
			.then((res) => res)
	)
}