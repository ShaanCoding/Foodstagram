import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

// check if the record exists
const checkFollowQuery = `
	SELECT account_id, followed_account_id FROM account_followers WHERE account_id = ?, followed_account_id = ?
`

// add new record that has account_id and followed_account_id accordingly
const followQuery = `
	INSERT INTO account_followers
	VALUES (account_id, followed_account_id)
`

// delete record that matches the account_id and followed_account_id
const unfollowQuery = `
	DELETE FROM account_followers WHERE account_id = ? AND followed_account_id = ?
`

async function Follow(req: Request, res: Response) {
	const account = req.account
	const account_to_follow = null // Get account_id of account_to_follow here
	if(account === undefined) {
		return res.status(500)
	}
	else {
		const follow_row = (await Query(checkFollowQuery, [account.account_id.toString()])) as Account[] // need to somehow place the account_to_follow in there as well
		if (follow_row.length === 0) {
			// Follow
		} else {
			// Unfollow
		}
	}
}

export { Follow }