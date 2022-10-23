import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'

const SelectCodeQuery = `
	select code, account_id from verification_codes
	where code = ?
`

const verifyAccountQuery = `
	UPDATE accounts
	SET
	verified = 1
	WHERE
		account_id = ?
`

async function ValidateEmail(req: Request, res: Response) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(formatErrors(errors))
		}

		const { code } = req.body

		const codes = (await Query(SelectCodeQuery, [code])) as VerificationCode[]

		if (codes.length > 0) {
			const rows = (await Query(verifyAccountQuery, [
				codes[0].account_id.toString(),
			])) as Account[]
			return res.status(200).json({
				message: 'Sucessfully confirmed account!',
			})
		}
		return res
			.status(404)
			.json({ message: 'Code is invalid. Please try again.' })
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database', error: e })
	}
}

export { ValidateEmail }
