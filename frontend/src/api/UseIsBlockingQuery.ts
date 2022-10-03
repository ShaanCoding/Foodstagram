import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseIsBlockingQuery(account_id:string) {
	return useQuery(['isBlocking', account_id], () =>
		axios
			.get(`${GetEndpoint('api')}/isblocking/${account_id}`)
			.then((res) => res)
	)
}