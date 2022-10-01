import axios from 'axios'
import { useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function AccountQuery() {
	return useQuery(
		['me'],
		() => axios.get(`${GetEndpoint('api')}/me`).then((res) => res),
		{ retry: false }
	)
}
