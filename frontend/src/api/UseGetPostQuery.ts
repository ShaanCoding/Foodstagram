import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseGetPostQuery(postID: string) {
	return useQuery(['getPost', postID], () =>
		axios.get(`${GetEndpoint('api')}/post/${postID}`).then((res) => res)
	)
}
