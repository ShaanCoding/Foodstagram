import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function PostCountQuery(profileID: string) {
	return useQuery(['postCount', profileID], () =>
		axios
			.get(`${GetEndpoint('api')}/postCount/${profileID}`)
			.then((res) => res)
	)
}