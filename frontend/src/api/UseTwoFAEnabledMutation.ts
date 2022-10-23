import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	email: string
}

export default function UseTwoFAEnabledMutation() {
	return useMutation(['enable2fa'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/account/has2fa`, {
				email: variables.email,
			})
			.then((res) => res)
	)
}
