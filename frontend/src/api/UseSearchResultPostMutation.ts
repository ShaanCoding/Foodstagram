import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	searchStr: string | undefined
	feedArr: any
}

export default function UseSearchResultPostMutation() {
	return useMutation(['search_post_results'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/api/search_post_results`, {
				searchStr: variables.searchStr,
				feedArr: variables.feedArr
			})
			.then((res) => res)
	)
}