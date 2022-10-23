import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

import GetEndpoint from './util/GetEndpoint'

export interface LikePost {
	post_id: number;
}

// export function UseLikePostMutation() {
// 	return useMutation(
// 		['likepost'],
// 		(variables: LikePost) =>
// 			axios.post<{}>(`${GetEndpoint('api')}/posts/${variables.post_id}`),
// 		{ retry: false }
// 	)
// }
