import UseAccountQuery from '../UseAccountQuery'
import { useNavigate } from 'react-router-dom'

function useAuth() {
	const navigate = useNavigate()
	const accountQuery = UseAccountQuery()

	if (accountQuery.isLoading) {
		return [{}, true]
	} else {
		if (accountQuery.isError) {
			navigate('/logout')
		}
		return [accountQuery.data?.data.account as Account, false]
	}
}

export default useAuth
