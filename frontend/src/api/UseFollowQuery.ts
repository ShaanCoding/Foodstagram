import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseFollowQuery() {
	return useQuery(['follow'], () =>
		axios
			.get(`${GetEndpoint('api')}/follow`)
			.then((res) => res)
	)
}