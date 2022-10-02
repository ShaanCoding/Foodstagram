import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	searchStr: string
}

export default function UseSearchUserMutation() {
	return useMutation(['search_user'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/api/search_user`, {
				searchStr: variables.searchStr
			})
			.then((res) => res)
	)
}