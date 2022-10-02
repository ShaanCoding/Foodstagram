import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function FollowerCountQuery(profileID: string) {
	return useQuery(['followerCount', profileID], () =>
		axios
			.get(`${GetEndpoint('api')}/followerCount/${profileID}`)
			.then((res) => res)
	)
}