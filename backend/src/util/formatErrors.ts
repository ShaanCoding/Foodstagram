import { Result, ValidationError } from 'express-validator'

const formatErrors = (errors: Result<ValidationError>) => {
	let response =
		'Please enter more appropriate values for the following fields: '
	errors.array().forEach((element) => {
		response += element.param + ','
	})
	return { message: response }
}

export default formatErrors
