import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	searchStr: string
  account_id: number
}

export default function UseSearchFollowingMutation() {
	return useMutation(['search_following'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/api/search_following`, {
				searchStr: variables.searchStr,
        account_id: variables.account_id
			})
			.then((res) => res)
	)
}