import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'
import { authenticator } from 'otplib'
import QRCode from 'qrcode'

const secretSelectQuery = `
	SELECT
		2fa,
		using_2fa
	FROM
		accounts
	WHERE
		account_id = ?
`

const has2FASelectQuery = `
	SELECT
		using_2fa
	FROM
		accounts
	WHERE
		email = ?
`

const secretUpdateQuery = `
	UPDATE accounts
	SET
		2fa = ?
	WHERE
		account_id = ?
`

const update2FAQuery = `
	UPDATE accounts
	SET
	using_2fa = ?
	WHERE
		account_id = ?
`

async function GenerateSecret(req: Request, res: Response) {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(formatErrors(errors))
		}

		const account = req.account

		if (account) {
			const rows = (await Query(secretSelectQuery, [
				account.account_id.toString(),
			])) as Account[]

			if (rows.length > 0) {
				if (account.using_2fa === 1) {
					return res.status(200).json({
						message: '2FA is already enabled on this account',
						redirect: true,
					})
				}

				let secret = rows[0]['2fa']
				if (secret === null) {
					secret = authenticator.generateSecret()
					await Query(secretUpdateQuery, [
						secret,
						account.account_id.toString(),
					])
				}

				const url = await QRCode.toDataURL(
					authenticator.keyuri(account.email, 'Foostagram', secret)
				)

				return res.status(200).json({ qr: url })
			}
			return res.status(404).json({ message: 'Account not found' })
		} else {
			return res.status(404).json({ message: 'Account not found' })
		}
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database', error: e })
	}
}

async function Enable2FA(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { otp } = req.body

	try {
		const account = req.account

		if (account) {
			const rows = (await Query(secretSelectQuery, [
				account.account_id.toString(),
			])) as Account[]
			if (rows.length > 0 && rows[0]['2fa'] !== null) {
				const valid = authenticator.check(otp, rows[0]['2fa'])
				if (valid) {
					await Query(update2FAQuery, [`1`, account.account_id.toString()])
				}
				return res.status(200).json({ message: 'Validated OTP', valid: valid })
			}
		}

		return res
			.status(500)
			.json({ message: 'Account does not have a secret set' })
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database', e: e })
	}
}

async function Has2FA(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { email } = req.body

	try {
		const rows = (await Query(has2FASelectQuery, [email])) as Account[]
		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Succesfully checked whether account has 2fa enabled',
				enabled: rows[0].using_2fa === 1,
			})
		}

		return res.status(500).json({ message: 'Account does not exist' })
	} catch (e) {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database', e: e })
	}
}

export { GenerateSecret, Enable2FA, Has2FA }
