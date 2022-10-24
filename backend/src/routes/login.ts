import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'
import { authenticator } from 'otplib'
import sendEmailVerificationCode from '../util/verificationCode'

const loginQuery = `
	SELECT account_id, username, email, COALESCE(2fa, '') 2fa, using_2fa, verified, COALESCE(bio, '') bio, email FROM accounts WHERE email = ? AND password_hash = ?
`

async function Login(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	let { email, password, otp } = req.body
	if (otp === undefined) {
		otp = ''
	}

	try {
		const rows = (await Query(loginQuery, [email, password])) as Account[]

		if (rows.length > 0) {
			const account = rows[0]

			if (rows[0].using_2fa === 1 && rows[0]['2fa'] !== null) {
				const valid = authenticator.check(otp, rows[0]['2fa'])
				if (!valid) {
					return res.status(401).json({
						message: 'Invalid one time password, please try again',
					})
				}
			}

			if (rows[0].verified === 0) {
				await sendEmailVerificationCode(rows[0])
				return res.status(200).json({
					message: 'Account is awaiting email verification!',
					awaitingEmailVerification: true,
				})
			}

			const accessToken = GenerateAccessToken(
				account.account_id,
				account.username,
				account.email
			)

			return res.status(200).json({
				message: 'Succesfully logged into account!',
				accessToken,
				hasTwoFactor: account.using_2fa === 1,
			})
		} else {
			return res.status(401).json({
				message: 'Invalid credentials, please try again',
			})
		}
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database', e: e })
	}
}

export { Login }
