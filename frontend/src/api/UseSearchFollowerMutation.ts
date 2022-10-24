import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	searchStr: string
  account_id: number
}

export default function UseSearchFollowerMutation() {
	return useMutation(['search_follower'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/api/search_follower`, {
				searchStr: variables.searchStr,
        account_id: variables.account_id
			})
			.then((res) => res)
	)
}