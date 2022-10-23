import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	username: string
	password: string
}

export default function UseDeleteProfileMutation() {
	return useMutation(['deleteprofile'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/deleteprofile/`, {
				username: variables.username,
				password: variables.password,
			})
			.then((res) => res)
	)
}
