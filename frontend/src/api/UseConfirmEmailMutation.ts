import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	code: string
}

export default function UseConfirmEmailMutation() {
	return useMutation(['confirmemail'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/email/confirm`, {
				code: variables.code,
			})
			.then((res) => res)
	)
}
