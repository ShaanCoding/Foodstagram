import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const Logout = () => {
	if (Cookies.get('access_token')) {
		Cookies.set('access_token', '')
	}

	return <Navigate replace to="/login" />
}

export default Logout
