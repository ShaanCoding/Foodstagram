import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import GetEndpoint from './util/GetEndpoint'

export interface CreateNewPost {
	image: string;
	caption: string;
	location: string;
}

export function UseCreatePostMutation() {
	return useMutation(
		['createpost'],
		(variables: CreateNewPost) => axios.post(`${GetEndpoint('api')}/posts`, variables),
		{ retry: false }
	)
}

