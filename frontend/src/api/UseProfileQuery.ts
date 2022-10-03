import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function ProfileQuery(username: string) {
	return useQuery(['profile', username], () =>
		axios
			.get(`${GetEndpoint('api')}/profile/${username}`)
			.then((res) => res)
	)
}