import { Request, Response, json } from 'express'

import { Query } from '../util/db'

// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'
// Step 1: get the post IDs and post data based on the following account IDs (ID to reference is hardcoded for now)
// REPLACE 13 WITH LOGGED IN ACCOUNT ID

const feedQuery = `
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
	PI.image_url AS post_image
FROM posts P
LEFT JOIN accounts A ON P.account_id = A.account_id
JOIN post_images PI ON PI.post_id = P.post_id
WHERE A.account_id IN (
	SELECT followed_account_id
	FROM account_followers
	WHERE account_id = ?
)
ORDER BY created_at DESC
LIMIT 20;
`

interface FeedQueryRow {
	post_id : number;
	account_id: number;
	username: string;
	profile_picture_url: string;
	location_name: string;
	location_lat: number;
	location_long: number;
	caption: string;
	created_at: string;
	updated_at: string;
	post_image: string;
}

async function GetPosts(req: Request, res: Response): Promise<Response<{ posts: Post[] } | { message: string }>> {
	const account = req.account;
	if (account === undefined) return res.status(500);

	const posts = (await Query(feedQuery, [ account.account_id.toString() ])) as FeedQueryRow[];
	if (posts.length > 0) {

		const map = new Map<number, Post>();

		posts.forEach((post) => {
			if(!map.has(post.post_id)) return map.set(post.post_id, { ...post, post_image: [ post.post_image ], post_likes: 0, location_lat: "", location_long: ""}); // TODO
			map.get(post.post_id)!.post_image.push(post.post_image);
		});

		return res.status(200).json({ posts: [...map.values()] });
	} else {
		return res.json({ message: 'No posts yet' }); // TODO: returning empty array is always better than a different type
	}

	// const { username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, post_image } = req.body
}

export { GetPosts }
