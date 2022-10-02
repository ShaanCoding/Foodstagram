import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseFeedQuery() {
	return useQuery(['feed'], () =>
		axios
			.get(`${GetEndpoint('api')}/feed`)
			.then((res) => res)
	)
}