import axios from 'axios'
import { QueryClient, useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export interface ProfilePic {
	image: string
}

export function UseProfilePicMutation(
	queryClient: QueryClient,
	username: string
) {
	return useMutation(
		['profilePic', username],
		(variables: ProfilePic) =>
			axios
				.post(`${GetEndpoint('api')}/profilePic/${username}`, variables)
				.then((res) => res),
		{
			retry: false,
			onSuccess: () => {
				queryClient.invalidateQueries(['profile', username])
			},
		}
	)
}
