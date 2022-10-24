import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'

const ProfileQuery = `
	SELECT *
	FROM accounts
	WHERE username = ? AND password_hash = ?
`

const deleteProfileQuery = `
	DELETE FROM accounts
	WHERE account_id = ?
`
async function DeleteProfile(req: Request, res: Response) {
	const { username, password } = req.body

	const rows = (await Query(ProfileQuery, [username, password])) as Account[]

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	try {
		await Query(deleteProfileQuery, [JSON.stringify(rows[0].account_id)])

		return res.status(201).json({
			message: 'Succesfully deleted account!',
		})
	} catch {
		return res
			.status(400)
			.json({ message: 'Invalid credentials' })
	}
}

export { DeleteProfile }
