import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

// check if the record exists
const checkBlockQuery = `
	SELECT account_id, blocked_account_id FROM account_blocks WHERE account_id = ? AND blocked_account_id = ?
`

// add new record that has account_id and blocked_account_id accordingly
const blockQuery = `
	INSERT INTO account_blocks
	VALUES (?, ?)
`

// delete record that matches the account_id and blocked_account_id
const unblockQuery = `
	DELETE FROM account_blocks WHERE account_id = ? AND blocked_account_id = ?
`

async function Block(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}
	const account = req.account
	const {account_to_block} = req.body // Get account_id of account_to_block here
	const follow_row = (await Query(checkBlockQuery, [account?.account_id.toString(), account_to_block.toString()])) as Account[] // need to somehow place the account_to_block's account_id in there as well
	try {
		if (follow_row.length < 1) {
			await Query(blockQuery, [account?.account_id.toString(), account_to_block.toString()])
			return res.status(200).json(
				{message: "Account blocked."} 
			)
			// Block
		} else {
			await Query(unblockQuery, [account?.account_id.toString(), account_to_block.toString()])
			return res.status(200).json(
				{message: "Account unblocked."}
			)
			// Unblock
		}
	}
	catch {
		return res.status(500).json(
			{message: "Error occurred."} 
		)
	}
}

export { Block }