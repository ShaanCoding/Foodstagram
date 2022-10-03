import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

// check if the record exists
const checkBlockQuery = `
	SELECT account_id, blocked_account_id FROM account_blocks WHERE account_id = ? AND blocked_account_id = ?
`

async function IsBlocking(req: Request, res: Response) {
	const account = req.account
	const account_to_block = req.params.account_id
	if (account === undefined) {
		return res.status(500).json(
			{message: "Please login."}
		)
	}
	const block_row = (await Query(checkBlockQuery, [account?.account_id.toString(), account_to_block.toString()])) as Account[]
	try {
		if (block_row.length < 1) {
			return res.status(200).json(
				{isBlocking: false}
			)
		} else {
			return res.status(200).json(
				{isBlocking: true}
			)
		}
	}
	catch {
		return res.status(500).json(
			{message: "Error occurred."} 
		)
	}
}

export { IsBlocking }