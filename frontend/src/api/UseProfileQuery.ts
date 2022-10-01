import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function ProfileQuery(profileid: string) {
	return useQuery(['profile', profileid], () =>
		axios
			.get(`${GetEndpoint('api')}/profile`)
			.then((res) => res)
	)
}