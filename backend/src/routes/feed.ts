import { json, Request, Response } from 'express'
// import { Query } from '../db'
// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'

const feedQuery = `
	SELECT post_id, account_id, location_name, location_lat, location_long, caption, created_at, updated_at FROM posts AS posts_table,
	SELECT profile_picture_url FROM accounts AS accounts_table
`

async function Feed(req: Request, res: Response) {
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json(formatErrors(errors))
	// }

	// const { email, password } = req.body

	// try {
	// 	const rows = (await Query(feedQuery, [email, password])) as Account[]

		
}

export { Feed }