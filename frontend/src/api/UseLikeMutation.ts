import axios from 'axios'
import { QueryClient, useMutation, useQuery } from 'react-query'

import GetEndpoint from './util/GetEndpoint'

export function UseLikeMutation(queryClient:QueryClient) {
	return useMutation(
		['like'],
		(account_id:string) => axios.post(`${GetEndpoint('api')}/like`, {account_to_follow:account_id}),
		{ retry: false, onSuccess:(data, account_id) => {
			queryClient.invalidateQueries(["hasLiked", account_id])
			queryClient.invalidateQueries(['likeCount', account_id])
		} },
		
	)
}