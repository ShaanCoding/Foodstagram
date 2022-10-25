import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { compare } from 'bcrypt'

const ProfileQuery = `
	SELECT *
	FROM accounts
	WHERE username = ?
`

const deleteCodesQuery = `
	DELETE FROM verification_codes
	WHERE account_id = ?
`

const deleteProfileQuery = `
	DELETE FROM accounts
	WHERE account_id = ?
`
async function DeleteProfile(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { username, password } = req.body

	try {
		const rows = (await Query(ProfileQuery, [username])) as Account[]
		if (rows.length != 1) {
			return res.status(401).json({
				message: 'Invalid credentials, please try again',
			})
		}

		const validPassword = await compare(password, rows[0].password_hash)
		if (!validPassword) {
			return res.status(401).json({
				message: 'Invalid credentials, please try again',
			})
		}

		await Query(deleteCodesQuery, [JSON.stringify(rows[0].account_id)])
		try {
			await Query(deleteProfileQuery, [JSON.stringify(rows[0].account_id)])
		} catch {
			return res.status(400).json({
				message:
					'You cannot delete an account which has posts. Please delete them first.',
			})
		}

		return res.status(201).json({
			message: 'Succesfully deleted account!',
		})
	} catch (e) {
		return res.status(400).json({ message: 'Invalid credentials', e })
	}
}

export { DeleteProfile }
