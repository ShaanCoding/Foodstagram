import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

// check if the record exists
const checkFollowQuery = `
	SELECT account_id, followed_account_id FROM account_followers WHERE account_id = ? AND followed_account_id = ?
`

async function IsFollowing(req: Request, res: Response) {
	const account = req.account
	const account_to_follow = req.params.account_id
	if (account === undefined) {
		return res.status(500).json(
			{message: "Please login."}
		)
	}
	const follow_row = (await Query(checkFollowQuery, [account?.account_id.toString(), account_to_follow.toString()])) as Account[] // need to somehow place the account_to_follow's account_id in there as well
	try {
		if (follow_row.length < 1) {
			return res.status(200).json(
				{isFollowing: false}
			)
		} else {
			return res.status(200).json(
				{isFollowing: true}
			)
		}
	}
	catch {
		return res.status(500).json(
			{message: "Error occurred."} 
		)
	}
}

export { IsFollowing }