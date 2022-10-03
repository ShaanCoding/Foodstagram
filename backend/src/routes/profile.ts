import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'

const ProfileQuery = `
select * from accounts where username = ?
`

async function Profile(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}
	try {
		const rows = (await Query(ProfileQuery, [req.params.username])) as Account[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Account details',
				data: rows[0],
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { Profile }
