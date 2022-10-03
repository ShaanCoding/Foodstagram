import axios from 'axios'
import { QueryClient, useMutation, useQuery } from 'react-query'

import GetEndpoint from './util/GetEndpoint'

export function UseFollowMutation(queryClient:QueryClient) {
	return useMutation(
		['follow'],
		(account_id:string) => axios.post(`${GetEndpoint('api')}/follow`, {account_to_follow:account_id}),
		{ retry: false, onSuccess:(data, account_id) => {
			queryClient.invalidateQueries(["isFollowing", account_id])
			queryClient.invalidateQueries(['followerCount', account_id])
		} },
		
	)
}