import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	fullName: string
	username: string
	email: string
	password: string
}

export default function UseRegisterMutation() {
	return useMutation(['register'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/register`, {
				fullName: variables.fullName,
				username: variables.username,
				email: variables.email,
				password: variables.password,
			})
			.then((res) => res)
	)
}
