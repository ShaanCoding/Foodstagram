import { Request, Response } from 'express'
import { EmailClient, EmailMessage } from "@azure/communication-email";
import { Query } from '../util/db'

const passwordResetQuery = `
UPDATE accounts
SET
	password_hash = ?
WHERE
	username = ?
`

const ProfileQuery = `
select * from accounts where username = ?
`


const connectionString = process.env['EMAIL_CONNECTION_STRING'];
const emailClient = new EmailClient(connectionString as string);

async function PasswordReset(req: Request, res: Response) {
	try {
		let passwordGen = (Math.random() + 1).toString(36).substring(2);
		const newPassword = passwordGen

		Query(passwordResetQuery, [newPassword, req.body.username])

		const rows = (await Query(ProfileQuery, [req.body.username])) as Account[]

		const emailMessage: EmailMessage = {
			sender: "DoNotReply@0b9a5130-62f2-442c-a8d0-8f50178920ed.azurecomm.net",
			content: {
				subject: `[` + req.body.username + `] Password reset`,
				plainText: `Hi ` + req.body.username + `!\n\nYour Foostaram account password has been reset to ` + newPassword + `.\n\nPlease log in and change it immediately to ensure the security of your account.`
			},
			recipients: {
				to: [
					{
						email: rows[0].email,
					},
				],
			},
		}

		const response = emailClient.send(emailMessage)
		return res.status(201).json({
			message: 'Succesfully reset password!',
		})
	} catch {
		return res
			.status(400)
			.json({ message: 'Invalid username' })
	}
}

export { PasswordReset }