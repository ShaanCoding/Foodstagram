import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
	if (Cookies.get('access_token')) {
		Cookies.set('access_token', '')
	}
	const navigate = useNavigate()
	navigate('/login')
	return <div>Logging out...</div>
}

export default Logout
