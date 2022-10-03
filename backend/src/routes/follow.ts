import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

// check if the record exists
const checkFollowQuery = `
	SELECT account_id, followed_account_id FROM account_followers WHERE account_id = ? AND followed_account_id = ?
`

// add new record that has account_id and followed_account_id accordingly
const followQuery = `
	INSERT INTO account_followers
	VALUES (?, ?)
`

// delete record that matches the account_id and followed_account_id
const unfollowQuery = `
	DELETE FROM account_followers WHERE account_id = ? AND followed_account_id = ?
`

async function Follow(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}
	console.log("Hello")
	const account = req.account
	const {account_to_follow} = req.body // Get account_id of account_to_follow here
	const follow_row = (await Query(checkFollowQuery, [account?.account_id.toString(), account_to_follow.toString()])) as Account[] // need to somehow place the account_to_follow's account_id in there as well
	try {
		if (follow_row.length < 1) {
			await Query(followQuery, [account?.account_id.toString(), account_to_follow.toString()])
			return res.status(200).json(
				{message: "Account Followed."} 
			)
			// Follow
		} else {
			await Query(unfollowQuery, [account?.account_id.toString(), account_to_follow.toString()])
			return res.status(200).json(
				{message: "Account unfollowed."} 
			)
			// Unfollow
		}
	}
	catch {
		return res.status(500).json(
			{message: "Error occurred."} 
		)
	}
}

export { Follow }