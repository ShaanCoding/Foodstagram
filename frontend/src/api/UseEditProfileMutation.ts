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

export default function UseEditProfileMutation(profileID: string) {
	return useMutation(['editprofile', profileID], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/editprofile/${profileID}`, {
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
