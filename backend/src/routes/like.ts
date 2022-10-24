import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

// check if the record exists
const checkLikeQuery = `
	SELECT account_id, post_id FROM liked_posts WHERE account_id = ? AND post_id = ?
`

// add new record that has account_id and followed_account_id accordingly
const likeQuery = `
	INSERT INTO liked_posts
	VALUES (?, ?)
`

// delete record that matches the account_id and followed_account_id
const unlikeQuery = `
	DELETE FROM liked_posts WHERE account_id = ? AND post_id = ?
`



async function Like(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}
	const account = req.account
	const {post_to_like} = req.body
	const like_row = (await Query(checkLikeQuery, [account?.account_id.toString(), post_to_like.toString()])) as Post[]
	try {
		if (like_row.length < 1) {
			await Query(likeQuery, [account?.account_id.toString(), post_to_like.toString()])
			return res.status(200).json(
				{message: "Post liked."} 
			)
		} else {
			await Query(unlikeQuery, [account?.account_id.toString(), post_to_like.toString()])
			return res.status(200).json(
				{message: "Post unliked."} 
			)
		}
	}
	catch(e) {
		return res.status(500).json(
			{message: e} 
		)
	}
}

export { Like }