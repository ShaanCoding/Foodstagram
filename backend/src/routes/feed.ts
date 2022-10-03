import { Request, Response, json } from 'express'
import { validationResult } from 'express-validator'

import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'

const feedQuery = `
	SELECT
		posts.post_id,
		posts.account_id,
		posts.post_image,
		posts.location_name,
		posts.location_lat,
		posts.location_long,
		posts.caption,
		posts.created_at,
		posts.updated_at,
		accounts.profile_picture_url,
		accounts.username
	FROM posts
	INNER JOIN accounts ON posts.account_id = accounts.account_id
	WHERE posts.account_id IN (
		SELECT followed_account_id
		FROM account_followers
		WHERE account_followers.account_id = ?
	)
	ORDER BY created_at DESC
	LIMIT 10;
`

export function Feed(req: Request, res: Response) {
	Promise
	.resolve()
	.then(() => validationResult(req))
	.then(errors => {
		if (!errors.isEmpty()) throw formatErrors(errors);
	})
	.then(() => req.account!.account_id)
	.then(accountId => Query(feedQuery, [accountId.toString()]))
	.then(posts => res.status(200).json(posts))
	.catch(err => {
		console.error(err);
		res.status(500).json({ message: "Failed to retrieve posts" })
	});
}
