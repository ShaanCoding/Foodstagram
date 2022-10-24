import { Request, Response, json } from 'express'
import { validationResult } from 'express-validator'
import Fuse from 'fuse.js'

import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'

//partial search with full text string: https://stackoverflow.com/questions/37711370/mysql-how-to-get-search-results-with-accurate-relevance

//search suggestion - location
async function SearchPosts(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(400).json(formatErrors(errors))

	const { searchStr } = req.body;

  const SearchQuery = `SELECT location_name from posts WHERE businessState IS NULL OR businessState = 1`

	try {
		const rows = (await Query(SearchQuery, [])) as Post[] /*as Post[]*/  // TODO: don't use a shared type, make a new one (that's right)
		const fuse = new Fuse(rows, {
			keys: ['location_name'],
			minMatchCharLength: -1,
			threshold: 0.5
		})
		const result: any[] = fuse.search(searchStr)

		if (result.length > 0) {
			return res.status(200).json({
				message: 'Post / Location matches found!',
				data: result,
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
    select account_id, name, username, bio, verified, profile_picture_url from accounts
  `

	try {
		const rows = (await Query(SearchQuery, [])) as Account[]
		const fuse = new Fuse(rows, {
			keys: ['username'],
			minMatchCharLength: -1, 
			threshold: 0.5
		})
		const result: any[] = fuse.search(searchStr)

		if (result.length > 0) {
			
			return res.status(200).json({
				message: 'User / Profile matches found!',
				data: result,
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

//follower interface
interface Follower {
	account_id: number;
	name: string;
	username: string;
	profile_picture_url: string;
}

//search suggestion - follower
async function SearchFollowings (req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { searchStr, account_id } = req.body

	const query = `
	select 
		F.followed_account_id as account_id, 
		A.name as name, 
		A.username as username, 
		A.profile_picture_url as profile_picture_url
		from account_followers F
		join accounts A on F.followed_account_id = A.account_id
		where F.account_id = ${account_id}
`

	try {
		const followers = (await Query(query, [])) as Follower[]
		const fuse = new Fuse(followers, {
			keys: ['username'],
			minMatchCharLength: -1, 
			threshold: 0.5
		})
		let result

		if (searchStr === "_all")
			result = followers
		else
			result = fuse.search(searchStr)
		
		if (result.length > 0) {
			return res.status(200).json({
				message: 'Followers matches found!',
				data: result,
			})
		}
		else {
			return res.status(200).json({
				message: 'No results'
			})
		}
	}
	catch {
		return res
			.status(500)
			.json({ message: 'Failed to connect to the database' })
	}
}


export { SearchUsers, SearchPosts, SearchFollowings }