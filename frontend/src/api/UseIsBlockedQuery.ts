import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseIsBlockedQuery(account_id:string) {
	return useQuery(['isBlocked', account_id], () =>
		axios
			.get(`${GetEndpoint('api')}/isblocked/${account_id}`)
			.then((res) => res)
	)
}