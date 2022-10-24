import { Request, Response } from 'express'
import { EmailClient, EmailMessage } from '@azure/communication-email'
import { Query } from '../util/db'
import { genSalt, hash } from 'bcrypt'

const passwordResetQuery = `
UPDATE accounts
SET
	password_hash = ?
WHERE
	email = ?	
	AND
	username = ?	
`

const ProfileQuery = `
select * from accounts where email = ?
`

const connectionString = process.env['EMAIL_CONNECTION_STRING']
const emailClient = new EmailClient(connectionString as string)

async function PasswordReset(req: Request, res: Response) {
	try {
		const rows = (await Query(ProfileQuery, [req.body.email])) as Account[]

		if (req.body.username === rows[0].username) {
			let passwordGen = (Math.random() + 1).toString(36).substring(2)
			const newPassword = passwordGen
			const salt = await genSalt(10)
			const hashed_password = await hash(newPassword, salt)
			Query(passwordResetQuery, [
				hashed_password,
				req.body.email,
				req.body.username,
			])

			const emailMessage: EmailMessage = {
				sender: 'DoNotReply@0b9a5130-62f2-442c-a8d0-8f50178920ed.azurecomm.net',
				content: {
					subject: `[` + req.body.username + `] Password reset`,
					plainText:
						`Hi ` +
						req.body.username +
						`!\n\nYour Foostaram account password has been reset to ` +
						newPassword +
						`.\n\nPlease log in and change it immediately to ensure the security of your account.`,
				},
				recipients: {
					to: [
						{
							email: rows[0].email,
						},
					],
				},
			}

			const response = await emailClient.send(emailMessage)
			return res.status(201).json({
				message: 'Succesfully reset password!',
			})
		} else {
			return res.status(400).json({ message: 'Invalid credentials' })
		}
	} catch {
		return res.status(400).json({ message: 'Invalid credentials' })
	}
}

export { PasswordReset }
