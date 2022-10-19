import { json, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'
// import { validationResult } from 'express-validator'
// import formatErrors from '../util/formatErrors'
// Step 1: get the post IDs and post data based on the following account IDs (ID to reference is hardcoded for now)
// REPLACE 13 WITH LOGGED IN ACCOUNT ID

const feedQuery = `
SELECT post_id, A.username, profile_picture_url, location_name, location_lat, location_long, caption, created_at, updated_at, businessState, businessScheduleTime, categories
FROM posts P LEFT JOIN accounts A ON P.account_id = A.account_id
WHERE A.account_id = ? AND businessState IS NOT NULL ORDER BY created_at DESC;
`

const postImageQuery = `SELECT (image_url) FROM post_images WHERE post_id = ?;`;
const numberOfCommentsOnPostQuery = `SELECT COUNT(*) FROM comments WHERE post_id = ?;`
const numberOfLikesQuery = `SELECT COUNT(*) FROM liked_posts WHERE post_id = ?;`

async function GetBusinessPosts(req: Request, res: Response) {
	const account = req.account
	if (account === undefined) {
		return res.status(500)
	} else {
		const posts = (await Query(feedQuery, [
			account.account_id.toString(),
		])) as Post[];

		for(let i = 0; i < posts.length; i++) {
			const postImages = (await Query(postImageQuery, [posts[i].post_id.toString()])) as any;
			posts[i].post_image = postImages[0].image_url;
			const numberOfComments = (await Query(numberOfCommentsOnPostQuery, [posts[i].post_id.toString()])) as any;
			posts[i].commentsCount = numberOfComments[0]['COUNT(*)'];
			const numberOfLikes = (await Query(numberOfLikesQuery, [posts[i].post_id.toString()])) as any;
			posts[i].post_likes = numberOfLikes[0]['COUNT(*)'];
		}

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

const individualPostQuery = `
SELECT post_id, location_name, caption, businessState, businessScheduleTime, created_at, categories
FROM posts
WHERE post_id = ? AND businessState IS NOT NULL ORDER BY created_at DESC;
`;

async function GetIndividualBusinessPost(req: Request, res: Response) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	  return res.status(400).json(formatErrors(errors));
	}

	const post_id = req.params.post_id;

	if(post_id === undefined) {
		return res.status(500)
	} else {
		const post = (await Query(individualPostQuery, [
			post_id
		])) as any;


		const postImages = (await Query(postImageQuery, [post_id])) as any;
		post[0].post_image = postImages[0].image_url;

		if (post.length > 0) {
			return res.status(200).json({
					post,
				});
		} else {
			return res.json({ message: 'No posts yet' })
		}
	}
}

export { GetBusinessPosts, GetIndividualBusinessPost }