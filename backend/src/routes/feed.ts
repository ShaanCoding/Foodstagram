import { json, Request, Response } from 'express'
// import { Query } from '../db'
// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'

// WHERE account_id = (SELECT account_id FROM accounts WHERE )

// Step 1: get the following account IDs (hardcoded for now)
// SELECT followed_account_id FROM account_followers WHERE account_id = 1
// Step 2: get the post IDs based on each following account ID
// Step 3: get the post data based on each post ID
// Step 4: order by post date
const feedQuery = `
	SELECT post_id, account_id, location_name, location_lat, location_long, caption, created_at, updated_at, (SELECT profile_picture_url FROM accounts WHERE account_id IN (1, 2, 3)) FROM posts WHERE account_id IN (1, 2, 3) AS posts_table
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