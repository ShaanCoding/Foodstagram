import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

// check if the record exists
const checkLikeQuery = `
	SELECT account_id, post_id FROM liked_posts WHERE account_id = ? AND post_id = ?
`

async function HasLiked(req: Request, res: Response) {
	const account = req.account
	const post_to_like = req.params.post_id
	if (account === undefined) {
		return res.status(500).json(
			{message: "Please login."}
		)
	}
	const like_row = (await Query(checkLikeQuery, [account?.account_id.toString(), post_to_like.toString()])) as Post[]
	try {
		if (like_row.length < 1) {
			return res.status(200).json(
				{hasLiked: false}
			)
		} else {
			return res.status(200).json(
				{hasLiked: true}
			)
		}
	}
	catch {
		return res.status(500).json(
			{message: "Error occurred."} 
		)
	}
}

export { HasLiked }