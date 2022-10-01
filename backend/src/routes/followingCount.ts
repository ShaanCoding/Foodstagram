import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'

const FollowingCountQuery = `
select count(*) as following from account_followers where account_id = "1"
`

async function FollowingCount(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	//const { email, password } = req.body

	try {
		const rows = (await Query(FollowingCountQuery, [])) as Account[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Following count',
				data: rows[0],
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { FollowingCount }
