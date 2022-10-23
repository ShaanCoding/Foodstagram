import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'
import sendEmailVerificationCode from '../util/verificationCode'

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
		(?, ?, ?, ?, 0)
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
			await sendEmailVerificationCode(accounts[0])

			return res.status(201).json({
				message: 'Successfully created account!',
			})
		}
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'An error occured trying to create your account', e })
	}
}

export { Register }
