import { json, Request, Response } from 'express'
// import { Query } from '../db'
// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'

// WHERE account_id = (SELECT account_id FROM accounts WHERE )

// Step 1: get the post IDs and post data based on the following account IDs (ID to reference is hardcoded for now)
// Step 4: order by post date

// REPLACE 13 WITH LOGGED IN ACCOUNT ID

async function Feed(req: Request, res: Response) {
	return req.account?.account_id
}

const feedQuery = `
SELECT post_id, A.username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image
FROM posts P LEFT JOIN accounts A ON P.account_id = A.account_id
WHERE A.account_id IN (SELECT followed_account_id FROM account_followers WHERE account_id = 13)
`

export { Feed }