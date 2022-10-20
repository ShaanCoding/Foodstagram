import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function UseCategoriesQuery() {
	return useQuery(['viewposts'], () =>
		axios.get(`${GetEndpoint('api')}/categories`).then((res) => res)
	)
}
