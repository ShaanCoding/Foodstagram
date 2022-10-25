import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'

// get number of likes on a post
const checkLikeCountQuery = `
	SELECT COUNT(*) as post_likes FROM liked_posts WHERE post_id = ?
`

async function LikeCount(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	try {
		const rows = (await Query(checkLikeCountQuery, [req.params.post_id])) as Post[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Like count',
				data: rows[0],
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { LikeCount }