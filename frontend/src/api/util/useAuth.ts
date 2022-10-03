import UseAccountQuery from '../UseAccountQuery'
import { useNavigate } from 'react-router-dom'

function useAuth() : [Account, boolean]{
	const navigate = useNavigate()
	const accountQuery = UseAccountQuery()

	if (accountQuery.isLoading) {
		return [{} as Account, true]
	} else {
		if (accountQuery.isError) {
			navigate('/logout')
			return [{} as Account, true]
		}
		return [accountQuery.data?.data.account as Account, false]
	}
}

export default useAuth
