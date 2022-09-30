import { Request, Response } from 'express'

function Index(req: Request, res: Response) {
	res.send('hello world!')
}

export { Index }
