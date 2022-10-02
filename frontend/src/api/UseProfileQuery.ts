import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function ProfileQuery(profileID: string) {
	return useQuery(['profile', profileID], () =>
		axios
			.get(`${GetEndpoint('api')}/profile/${profileID}`)
			.then((res) => res)
	)
}