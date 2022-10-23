import axios from 'axios'
import { useQuery } from 'react-query'
import GetEndpoint from './util/GetEndpoint'

export default function useTwoFAQuery() {
	return useQuery(['2fa'], () =>
		axios.get(`${GetEndpoint('api')}/secret/generate`).then((res) => res)
	)
}
