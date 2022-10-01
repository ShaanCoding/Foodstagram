import axios from 'axios'
import Cookies from 'js-cookie'

// Run as middleware when a request is sent, adds the auth header
axios.interceptors.request.use(
	async (config) => {
		const token = Cookies.get('access_token')
		if (token && config.headers !== undefined) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error) => Promise.reject(error)
)
