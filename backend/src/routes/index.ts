import { Request, Response } from 'express'

function index(req: Request, res: Response) {
	res.send('hello world!')
}

export { index }
