import { json, Request, Response } from 'express'
import { Query } from '../db'
// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'

// WHERE account_id = (SELECT account_id FROM accounts WHERE )

// Step 1: get the post IDs and post data based on the following account IDs (ID to reference is hardcoded for now)
// Step 4: order by post date

// REPLACE 13 WITH LOGGED IN ACCOUNT ID

const feedQuery = `
SELECT post_id, A.username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image
FROM posts P LEFT JOIN accounts A ON P.account_id = A.account_id
WHERE A.account_id IN (SELECT followed_account_id FROM account_followers WHERE account_id = 13)
`

async function GetAccount(req: Request, res: Response) {
	try {
		const account = req.account
		if (account) {
			return req.account?.account_id
		} else {
			return res.status(404).json({ message: 'Account not found' })
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}


async function GetPosts(req: Request, res: Response) {
	const { username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image } = req.body
	const posts = (await Query(feedQuery, [username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image])) as Post[]

if (posts.length > 0) {
} else {
	return res.json({ message: 'No posts yet' })
}
}

export { GetAccount, GetPosts }