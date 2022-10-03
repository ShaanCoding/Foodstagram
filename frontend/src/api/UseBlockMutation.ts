import axios from 'axios'
import { QueryClient, useMutation, useQuery } from 'react-query'

import GetEndpoint from './util/GetEndpoint'

export function UseBlockMutation(queryClient:QueryClient) {
	return useMutation(
		['block'],
		(account_id:string) => axios.post(`${GetEndpoint('api')}/block`, {account_to_block:account_id}),
		{ retry: false, onSuccess:(data, account_id) => {
			queryClient.invalidateQueries(["isBlocking", account_id])
		} },
		
	)
}