import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

const checkFollowQuery = `
`

const followQuery = `
`
const deleteQuery = `
`

async function Follow(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { account_to_follow } = req.body

	try {
		const rows = (await Query(followQuery, [account_to_follow])) as Account[]

	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { Follow }
