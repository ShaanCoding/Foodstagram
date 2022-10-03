import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import GetEndpoint from './util/GetEndpoint'

export interface CreateNewPost {
	image: string
	caption: string
	location: string
}

export function UseCreatePostMutation() {
	return useMutation(
		['createpost'],
		(variables: CreateNewPost) =>
			axios.post(`${GetEndpoint('api')}/posts`, variables),
		{ retry: false }
	)
}

export interface UpdatePost {
	post_id: number
	caption: string
	location: string
}

export function UseUpdatePostMutation() {
	return useMutation(
		['updatepost'],
		(variables: UpdatePost) =>
			axios.put(`${GetEndpoint('api')}/posts/${variables.post_id}`),
		{ retry: false }
	)
}

export interface DeletePost {
	post_id: number
}

export function UseDeletePostMutation() {
	return useMutation(
		['deletepost'],
		(variables: DeletePost) =>
			axios.delete(`${GetEndpoint('api')}/posts/${variables.post_id}`),
		{ retry: false }
	)
}
