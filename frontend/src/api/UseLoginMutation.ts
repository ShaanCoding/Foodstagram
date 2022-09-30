import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	email: string
	password: string
}

export default function UseLoginMutation() {
	return useMutation(['login'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/login`, {
				email: variables.email,
				password: variables.password,
			})
			.then((res) => res)
	)
}
