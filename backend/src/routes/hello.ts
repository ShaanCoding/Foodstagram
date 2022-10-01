import { Request, Response } from 'express'
import { Query } from '../util/db'

async function Hello(req: Request, res: Response) {
	const name = req.params.name ?? 'world'

	const rows = (await Query('SELECT * FROM accounts WHERE name = ?', [
		'Jack',
	])) as Account[]

	res.send(`hello ${name}! Take a look at ${JSON.stringify(rows[0].bio)}`)
}

export { Hello }
