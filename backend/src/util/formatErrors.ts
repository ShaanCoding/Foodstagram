import { Result, ValidationError } from 'express-validator'

const neatNames = {
	email: 'Email Address',
	fullName: 'Full Name',
	password: 'Password',
	username: 'Username',
}

const formatErrors = (errors: Result<ValidationError>) => {
	let response =
		'Please enter more appropriate values for the following fields: '
	errors.array().forEach((element) => {
		response += element.param + ', '
	})

	for (const [key, value] of Object.entries(neatNames)) {
		response = response.replaceAll(key, value)
	}
	return { message: response.slice(0, -2) }
}

export default formatErrors
