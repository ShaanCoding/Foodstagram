import { json, Request, Response } from 'express'
import { Query } from '../util/db'

const profilePostsQuery = `
SELECT P.post_id,COUNT(LP.post_id) as post_likes, A.username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image
FROM posts P
LEFT JOIN accounts A ON P.account_id = A.account_id
LEFT JOIN liked_posts LP ON P.post_id = LP.post_id
WHERE A.account_id = ?
GROUP BY P.post_id
ORDER BY created_at DESC
`

async function ProfilePosts(req: Request, res: Response) {
	const account = req.params.profileID
	if (account === undefined) {
		return res.status(500)
	} else {
		const posts = (await Query(profilePostsQuery, [
			account.toString(),
		])) as Post[]
		if (posts.length > 0) {
			return res.status(200).json({
				posts,
			})
		} else {
			return res.json({ message: 'No posts yet' })
		}
	}
}

export { ProfilePosts }
