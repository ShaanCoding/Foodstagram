import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function FollowingCountQuery(profileID: string) {
	return useQuery(['followingCount', profileID], () =>
		axios
			.get(`${GetEndpoint('api')}/followingCount/${profileID}`)
			.then((res) => res)
	)
}