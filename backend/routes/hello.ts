import { Request, Response } from 'express'

function hello(req: Request, res: Response) {
	const name = req.params.name ?? 'world'
	res.send(`hello ${name}!`)
}

export { hello }
