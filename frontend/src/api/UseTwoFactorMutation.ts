import axios from 'axios'
import { useMutation } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

interface MutationVariables {
	otp: string
}

export default function UseTwoFactorMutation() {
	return useMutation(['enable2fa'], (variables: MutationVariables) =>
		axios
			.post(`${GetEndpoint('api')}/secret/enable`, {
				otp: variables.otp,
			})
			.then((res) => res)
	)
}
