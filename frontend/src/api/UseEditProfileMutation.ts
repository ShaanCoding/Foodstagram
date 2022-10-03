import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	fullName: string
	username: string
	bio: string
	email: string
	password: string
	phone: string
}

export default function UseEditProfileMutation(username: string) {
	return useMutation(['editprofile', username], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/editprofile/${username}`, {
				fullName: variables.fullName,
				username: variables.username,
				bio: variables.bio,
				email: variables.email,
				password: variables.password,
				phone: variables.phone,
			})
			.then((res) => res)
	)
}
