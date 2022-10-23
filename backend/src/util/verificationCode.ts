import { EmailClient, EmailMessage } from '@azure/communication-email'
import { Query } from './db'
import { authenticator } from 'otplib'

const SelectCodeQuery = `
select code from verification_codes
where account_id = ?
`

const InsertCodeQuery = `
INSERT INTO
verification_codes (
	code,
	account_id,
	generated_at
)
VALUES
(?, ?, NOW())
`

const DeleteOldCodeQuery = `
DELETE FROM verification_codes WHERE account_id = ?
`

const connectionString = process.env['EMAIL_CONNECTION_STRING']
const emailClient = new EmailClient(connectionString as string)

export default async function sendEmailVerificationCode(account: Account) {
	try {
		await Query(DeleteOldCodeQuery, [account.account_id.toString()])

		const rows = (await Query(SelectCodeQuery, [
			account.email,
			account.account_id.toString(),
		])) as VerificationCode[]

		let code
		if (rows.length > 0) {
			code = rows[0].code
		} else {
			code = authenticator.generateSecret()
			await Query(InsertCodeQuery, [code, account.account_id.toString()])
		}
		const emailMessage: EmailMessage = {
			sender: 'DoNotReply@0b9a5130-62f2-442c-a8d0-8f50178920ed.azurecomm.net',
			content: {
				subject: `[` + account.username + `] Email Verification`,
				plainText:
					`Hi ` +
					account.username +
					`!\n\nThank you for creating a brand new Foostaram account! Your activation code is:\n\n` +
					code +
					`\n\nPlease visit https://asd-frontend.azurewebsites.net/email/confirm to validate your email.`,
			},
			recipients: {
				to: [
					{
						email: account.email,
					},
				],
			},
		}

		await emailClient.send(emailMessage)
	} catch (e) {
		console.log(e)
	}
}
