const { REACT_APP_ENVIRONMENT } = process.env

const GetEndpoint = (path: string) => {
	if (REACT_APP_ENVIRONMENT === 'production') {
		return 'https://asd-backend.azurewebsites.net'
	} else {
		return 'http://localhost:3001'
	}
}

export default GetEndpoint
