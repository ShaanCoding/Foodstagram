import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
	const navigate = useNavigate()

	useEffect(() => {
		if (Cookies.get('access_token')) {
			Cookies.set('access_token', '')
		}

		navigate('/login')
	}, [])

	return <div>Logging out...</div>
}

export default Logout
