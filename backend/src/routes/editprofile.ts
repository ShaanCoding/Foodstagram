import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { genSalt, hash } from 'bcrypt'

const editProfileQuery = `
	UPDATE accounts
	SET
		name = ?,
		username = ?,
		bio = ?,
		email = ?,
		password_hash = ?,
		phone = ?
	WHERE
		username = ?
`

async function EditProfile(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { fullName, username, bio, email, password, phone } = req.body

	try {
		const salt = await genSalt(10)
		const hashed_password = await hash(password, salt)
		await Query(editProfileQuery, [
			fullName,
			username,
			bio,
			email,
			hashed_password,
			phone,
			req.params.username,
		])

		return res.status(201).json({
			message: 'Succesfully updated account!',
		})
	} catch {
		return res
			.status(400)
			.json({ message: 'An account with those details already exists' })
	}
}

export { EditProfile }
