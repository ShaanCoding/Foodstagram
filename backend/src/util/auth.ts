import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Query } from './db'

interface AccessToken {
	account_id: number
	username: string
	email: string
}

const privateKey = process.env.JWT_SECRET as string

const GenerateAccessToken = (
	account_id: number,
	username: string,
	email: string
) => {
	return jwt.sign(
		{
			account_id,
			username,
			email,
		},
		privateKey,
		{ expiresIn: '2h' }
	)
}

const userQuery = `
	SELECT * FROM accounts WHERE account_id = ?
`

async function AuthenticateUser(req: Request, res: Response, next: any) {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) return res.sendStatus(401)

	jwt.verify(token, privateKey, async (err: any, account: any) => {
		if (err) {
			//console.log(err)
			return res.sendStatus(401)
		}

		account = account as AccessToken

		const rows = (await Query(userQuery, [account.account_id])) as Account[]
		if (rows.length === 0 || account === undefined) {
			console.log('account no longer exists')
			return res.sendStatus(401)
		}

		req.account = rows[0]

		next()
	})
}

export { GenerateAccessToken, AuthenticateUser }
