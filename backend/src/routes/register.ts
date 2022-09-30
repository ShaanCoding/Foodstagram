import { json, Request, Response } from 'express'
import { Query } from '../db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'

const registerQuery = `
	INSERT INTO
		accounts (
			name,
			username,
			password_hash,
			email,
			verified
		)
	VALUES
		(?, ?, ?, ?, 1)
`

async function Register(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { fullName, username, email, password } = req.body

	try {
		await Query(registerQuery, [fullName, username, password, email])

		return res.status(201).json({
			message: 'Succesfully created account!',
		})
	} catch {
		return res
			.status(400)
			.json({ message: 'An account with those details already exists' })
	}
}

export { Register }
