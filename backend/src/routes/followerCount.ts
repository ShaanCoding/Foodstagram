import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { request } from 'http'

const FollowerCountQuery = `
select count(*) as followers from account_followers where followed_account_id = ?
`

async function FollowerCount(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	try {
		const rows = (await Query(FollowerCountQuery, [req.params.profileID])) as Account[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Follower count',
				data: rows[0],
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { FollowerCount }
