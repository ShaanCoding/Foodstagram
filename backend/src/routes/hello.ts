import { Request, Response } from 'express'

async function Hello(req: Request, res: Response) {
	const name = req.params.name ?? 'world'

	res.send(`hello ${name}!`)
}

export { Hello }
