import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'


//partial search with full text string: https://stackoverflow.com/questions/37711370/mysql-how-to-get-search-results-with-accurate-relevance

async function ShowPostSearchResults(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { searchStr } = req.body

  const SearchQuery = `
    select * from posts where location_name like concat ('%', '${searchStr}', '%')
  `

	try {
		const rows = (await Query(SearchQuery, [])) as Post[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Search results:',
				data: rows,
			})
		} else {
			return res.status(200).json({
				message: 'No results'
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}


//search suggestion - location
async function SearchPosts(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { searchStr } = req.body

  const SearchQuery = `
    select location_name from posts where location_name like concat ('%', '${searchStr}', '%')
  `

	try {
		const rows = (await Query(SearchQuery, [])) as Post[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Search Results:',
				data: rows,
			})
		} else {
			return res.status(200).json({
				message: 'No results'
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

//search suggestion - user
async function SearchUsers(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { searchStr } = req.body
	//partial search with full text string: https://stackoverflow.com/questions/37711370/mysql-how-to-get-search-results-with-accurate-relevance

  const SearchQuery = `
    select username, name from accounts where username like concat ('%', '${searchStr}', '%')
		order by username
  `

	try {
		const rows = (await Query(SearchQuery, [])) as Account[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Search Results:',
				data: rows,
			})
		} else {
			return res.status(200).json({
				message: 'No results'
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

//show search results - user
async function ShowUserSearchResults(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { searchStr } = req.body
	//partial search with full text string: https://stackoverflow.com/questions/37711370/mysql-how-to-get-search-results-with-accurate-relevance

  const SearchQuery = `
    select * from accounts where username like concat ('%', '${searchStr}', '%')
		order by username
  `

	try {
		const rows = (await Query(SearchQuery, [])) as Account[]

		if (rows.length > 0) {
			return res.status(200).json({
				message: 'Search Results:',
				data: rows,
			})
		} else {
			return res.status(200).json({
				message: 'No results'
			})
		}
	} catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}

export { SearchUsers, SearchPosts, ShowUserSearchResults, ShowPostSearchResults }