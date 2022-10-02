import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	searchStr: string
}

export default function UseSearchPostMutation() {
	return useMutation(['search_post'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/api/search_post`, {
				searchStr: variables.searchStr
			})
			.then((res) => res)
	)
}