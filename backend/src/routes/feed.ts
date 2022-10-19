import { json, Request, Response } from 'express'
import { Query } from '../util/db'
// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'
// Step 1: get the post IDs and post data based on the following account IDs (ID to reference is hardcoded for now)
// REPLACE 13 WITH LOGGED IN ACCOUNT ID

const feedQuery = `
SELECT post_id, A.account_id, A.username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image
FROM posts P LEFT JOIN accounts A ON P.account_id = A.account_id
WHERE A.account_id IN (SELECT followed_account_id FROM account_followers WHERE account_id = ?) ORDER BY created_at DESC
`

async function GetPosts(req: Request, res: Response) {
	const account = req.account
	if (account === undefined) {
		return res.status(500)
	} else {
		const posts = (await Query(feedQuery, [
			account.account_id.toString(),
		])) as Post[]
		if (posts.length > 0) {
			return res.status(200).json({
				posts,
			})
		} else {
			return res.json({ message: 'No posts yet' })
		}
	}
	// const { username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image } = req.body
}

export { GetPosts }
