import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

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

const accountDetailsQuery = `SELECT * FROM accounts WHERE email = ?`

async function Register(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { fullName, username, email, password } = req.body

	try {
		await Query(registerQuery, [fullName, username, password, email])
	} catch {
		return res
			.status(400)
			.json({ message: 'An account with those details already exists' })
	}

	try {
		const accounts = (await Query(accountDetailsQuery, [email])) as Account[]

		if (accounts.length > 0) {
			const accessToken = GenerateAccessToken(
				accounts[0].account_id,
				accounts[0].username,
				accounts[0].email
			)

			return res.status(201).json({
				message: 'Succesfully created account!',
				accessToken,
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'An error occured trying to create your account' })
	}
}

export { Register }
