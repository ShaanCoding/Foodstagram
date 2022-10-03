import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	searchStr: string
}

export default function UseSearchResultUserMutation() {
	return useMutation(['search_user_results'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/api/search_user_results`, {
				searchStr: variables.searchStr
			})
			.then((res) => res)
	)
}