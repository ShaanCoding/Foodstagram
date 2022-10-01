import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function FollowerCountQuery(profileid: string) {
	return useQuery(['followerCount', profileid], () =>
		axios
			.get(`${GetEndpoint('api')}/followerCount`)
			.then((res) => res)
	)
}