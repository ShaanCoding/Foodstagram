import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseLikeQuery() {
	return useQuery(['like'], () =>
		axios
			.get(`${GetEndpoint('api')}/like`)
			.then((res) => res)
	)
}