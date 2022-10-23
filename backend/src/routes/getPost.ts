import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'

const GetPostQuery = `
SELECT
	P.post_id AS post_id,
	A.account_id AS account_id,
	A.username AS username,
	profile_picture_url,
	P.location_name AS location_name,
	P.location_lat AS location_lat,
	P.location_long AS location_long,
	P.caption AS caption,
	P.created_at AS created_at,
	P.updated_at AS updated_at,
	PI.image_url AS image_url
FROM posts P
LEFT JOIN accounts A ON P.account_id = A.account_id
JOIN post_images PI ON PI.post_id = P.post_id
WHERE P.post_id = ?
`

interface PostQueryRow {
	post_id: number
	account_id: number
	username: string
	profile_picture_url: string
	location_name: string
	location_lat: number
	location_long: number
	caption: string
	created_at: string
	updated_at: string
	image_url: string
}
interface Post {
	post_id: number
	account_id: number
	location_name: string
	location_lat: number
	location_long: number
	caption: string
	created_at: string
	updated_at: string
	profile_picture_url: string
	username: string
	image_url: string[]
	post_likes: number
}

async function GetPost(req: Request, res: Response) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(formatErrors(errors))
		}

		let rows = (await Query(GetPostQuery, [
			req.params.postID,
		])) as PostQueryRow[]

		if (rows.length > 0) {
			const map = new Map<number, Post>()
			rows.forEach((post) => {
				if (!map.has(post.post_id))
					return map.set(post.post_id, {
						...post,
						image_url: [post.image_url],
						post_likes: 0,
					})
				map.get(post.post_id)!.image_url.push(post.image_url)
			})

			return res.status(200).json({
				message: 'Post found',
				post: map.get(rows[0].post_id),
			})
		}

		return res.status(400).json({ message: 'Failed to find post' })
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database', e })
	}
}

export { GetPost }
