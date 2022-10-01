import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function PostCountQuery(profileid: string) {
	return useQuery(['postCount', profileid], () =>
		axios
			.get(`${GetEndpoint('api')}/postCount`)
			.then((res) => res)
	)
}