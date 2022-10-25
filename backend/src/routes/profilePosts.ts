import { Request, Response, json } from 'express'

import { Query } from '../util/db'

const profilePostsQuery = `
SELECT
	P.post_id AS post_id,
	COUNT(LP.post_id) AS post_likes,
	A.username AS username,
	profile_picture_url,
	location_name,
	location_lat,
	location_long,
	caption,
	created_at,
	updated_at,
	image_url
FROM posts P
LEFT JOIN accounts A ON P.account_id = A.account_id
LEFT JOIN liked_posts LP ON P.post_id = LP.post_id
LEFT JOIN post_images PI ON P.post_id = PI.post_id
WHERE A.account_id = ?
AND (businessState IS NULL OR businessState = 1)
GROUP BY P.post_id
ORDER BY created_at DESC
`
interface ProfilePostRow {
	post_id: number
	post_likes: number
	username: string
	profile_picture_url: string
	location_name: string
	location_lat: number
	location_long: number
	caption: string
	created_at: Date
	updated_at: Date
	image_url: string
}
type ProfilePost = Omit<ProfilePostRow, 'image_url'> & { image_url: string[] }

async function ProfilePosts(req: Request, res: Response) {
	const { profileID } = req.params
	if (!profileID) return res.status(500)

	const posts = (await Query(profilePostsQuery, [
		profileID.toString(),
	])) as ProfilePostRow[]
	if (!posts.length) return res.json({ message: 'No posts yet' })

	// group rows by post_id and merge the image_url together
	const map = new Map<number, ProfilePost>()
	posts.forEach((post) => {
		if (!map.has(post.post_id))
			return map.set(post.post_id, { ...post, image_url: [post.image_url] })
		map.get(post.post_id)!.image_url.push(post.image_url)
	})

	return res.status(200).json({ posts: [...map.values()] })
}

export { ProfilePosts }
