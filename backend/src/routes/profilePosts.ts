import { json, Request, Response } from 'express'
import { Query } from '../util/db'
// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'
// Step 1: get the post IDs and post data based on the following account IDs (ID to reference is hardcoded for now)
// REPLACE 13 WITH LOGGED IN ACCOUNT ID

const profilePostsQueryBak = `
SELECT post_id, A.username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image
FROM posts P LEFT JOIN accounts A ON P.account_id = A.account_id
WHERE A.account_id = ? ORDER BY created_at
`

const profilePostsQuery = `
SELECT P.post_id, coalesce (L.post_likes, 0) post_likes, A.username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image
FROM (select post_id, COUNT(post_id) as post_likes from liked_posts) L, posts P
LEFT JOIN accounts A ON P.account_id = A.account_id
where L.post_id = P.post_id AND
A.account_id = 1 ORDER BY created_at
`

async function ProfilePosts(req: Request, res: Response) {
	const account = req.params.profileID
	if(account === undefined) {
		return res.status(500)
	}
	else {
		const posts = (await Query(profilePostsQuery, [account.toString()])) as Post[]
		if (posts.length > 0) {
			return res.status(200).json({
				posts
			})
		} else {
			return res.json({ message: 'No posts yet' })
		}
	}
	// const { username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image } = req.body


}

export { ProfilePosts }