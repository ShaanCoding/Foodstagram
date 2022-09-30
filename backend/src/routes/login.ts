import { json, Request, Response } from 'express'
import { Query } from '../db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'

const loginQuery = `
	SELECT account_id, name, bio, email FROM accounts WHERE email = ? AND password_hash = ? AND verified = 1
`

async function Login(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { email, password } = req.body

	try {
		const rows = (await Query(loginQuery, [email, password])) as Account[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Succesfully logged into account!',
				data: rows[0],
			})
		} else {
			return res.status(401).json({
				message: 'Invalid login credentials!',
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { Login }
