import { Request, Response } from 'express'

async function Me(req: Request, res: Response) {
	try {
		const account = req.account

		if (account) {
			return res.status(200).json({
				message: 'Account details',
				account,
			})
		} else {
			return res.status(404).json({ message: 'Account not found' })
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { Me }
