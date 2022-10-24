import { json, Request, Response } from 'express'
import { Query } from '../util/db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { GenerateAccessToken } from '../util/auth'

// add new record that has account_id and followed_account_id accordingly
// may need to edit based on comments table decision
const commentQuery = `
	INSERT INTO comments
	VALUES (?, ?, ?)
`

// delete record that matches the account_id and followed_account_id
const deleteCommentQuery = `
	DELETE FROM post_comments WHERE account_id = ? AND comment_id = ?
`

export async function Comment(req: Request, res: Response) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}
	const account = req.account
	const {post_to_comment} = req.body
	// const comment = req.body[]
	try {
		await Query(commentQuery, [account?.account_id.toString(), post_to_comment.toString(), ])
		return res.status(200).json(
			{message: "Comment posted."} 
		)
	}
	catch {
		return res.status(500).json(
			{message: "Error occurred."} 
		)
	}
}

export function DeleteComment(req: Request, res: Response) {
	const getUserIdQuery = 'SELECT account_id FROM comments WHERE comment_id = ?;';

	Promise
	.resolve()
	.then(() => validationResult(req))
	.then((errors) => {
		if (!errors.isEmpty()) throw formatErrors(errors);
	})
	.then(() => Query(getUserIdQuery, [req.params.post_id]))
	.then(res => res as { account_id: number }[])
	.then(([{ account_id }]) => {
		if(req.account?.account_id && account_id !== req.account?.account_id) throw new Error('You are not authorized to delete this comment');
	})
	.then(() => Query(deleteCommentQuery, [req.params.post_id]))
	.then(() => res.status(204).json({ message: 'Succesfully deleted comment!' }))
	.catch(error => {
		console.error(error);
		res.status(500).json({ message: 'Failed to delete comment' })
	});
}