import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'


//partial search with full text string: https://stackoverflow.com/questions/37711370/mysql-how-to-get-search-results-with-accurate-relevance

async function GetAllPosts(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}


  const GetAllUsersQuery = `
    select * from post
  `

	try {
		const rows = (await Query(GetAllUsersQuery + req.body.searchStr, [])) as Account[]

		if (rows.length > 0) {
			return res.status(200).json({
				data: rows
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

async function SearchPosts(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { searchStr } = req.body

  const SearchQuery = `
    select username, profile_picture_url from accounts where username like concat ('%', ${searchStr}, '%')
		order by
			name like concat(${searchStr}, '%') desc,
			ifnull(nullif(instr(name, concat(' ', ${searchStr})), 0), 99999),
			ifnull(nullif(instr(name, ${searchStr}), 0), 99999),
			username
  `

	try {
		const rows = (await Query(SearchQuery + req.body.searchStr, [])) as Account[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Search Results:',
				data: rows[0],
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { SearchPosts, GetAllPosts }