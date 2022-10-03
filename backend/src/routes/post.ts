import { Request, Response, json } from 'express'
import { validationResult } from 'express-validator'
import { OkPacket } from "mysql";
import { v4 as uuidv4 } from "uuid";

import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'
import { getBlobClient } from '../util/storage'

export async function CreatePost(req: Request, res: Response) {
	const postQuery = 'INSERT INTO `posts` (`account_id`, `post_image`, `location_name`, `location_lat`, `location_long`, `caption`, `created_at`, `updated_at`) VALUES ( ?, ?, ?, ?, ?, ?, NOW(), NOW() )';
	
	const { ENVIRONMENT } = process.env;
	const { picture, caption, location } = req.body;
	
	const pictureName = uuidv4();
	const pictureBuffer = Buffer.from(picture, 'base64');

	const lognitude = 0.1;
	const latitude = 0.1;

	Promise
	.resolve()
	.then(() => validationResult(req)) // Validate the incoming http request
	.then((errors) => {
		if (!errors.isEmpty()) throw formatErrors(errors);
	})
	.then(() => getBlobClient().getContainerClient(ENVIRONMENT!).getBlockBlobClient(pictureName)) // get the container
	.then(blobBlockClient => blobBlockClient.upload(pictureBuffer, pictureBuffer.length)) // upload the file to the container
	.then(uploadResponse => Query(postQuery, [req.account!.account_id, `https://asdbackend.blob.core.windows.net/${ENVIRONMENT}/${pictureName}`, location, lognitude, latitude, caption]))
	.then(() => res.status(201).json({ message: 'Succesfully created post!' }))
	.catch(error => {
		console.log(error);
		res.status(500).json({ message: 'Failed to create post' })
	});
}

export function UpdatePost(req: Request, res: Response) {
	const getUserIdQuery = 'SELECT account_id FROM posts WHERE post_id = ?;';
	const updatePostQuery = 'UPDATE posts SET caption = ?, location_name = ?, updated_at = NOW() WHERE post_id = ?;';

	Promise
	.resolve()
	.then(() => validationResult(req))
	.then((errors) => {
		if (!errors.isEmpty()) throw formatErrors(errors);
	})
	.then(() => Query(getUserIdQuery, [req.params.post_id]))
	.then(res => res as { account_id: number }[])
	.then(arr => {
		if(!arr.length) throw new Error('Post does not exist');
		return arr[0];
	})
	.then(({ account_id }) => {
		if(account_id !== req.account?.account_id) throw new Error('You are not authorized to delete this post');
	})
	.then(() => Query(updatePostQuery, [req.body.caption, req.body.location, req.params.post_id]))
	.then(() => res.status(200).json({ message: 'Succesfully updated post!' }))
	.catch(error => {
		console.error(error);
		res.status(500).json({ message: 'Failed to update post' })
	});
}

export function DeletePost(req: Request, res: Response) {
	const getUserIdQuery = 'SELECT account_id FROM posts WHERE post_id = ?;';
	const deleteQuery = "DELETE FROM posts WHERE post_id = ?;";

	Promise
	.resolve()
	.then(() => validationResult(req))
	.then((errors) => {
		if (!errors.isEmpty()) throw formatErrors(errors);
	})
	.then(() => Query(getUserIdQuery, [req.params.post_id]))
	.then(res => res as { account_id: number }[])
	.then(arr => {
		if(!arr.length) throw new Error('Post does not exist');
		return arr[0];
	})
	.then(({ account_id }) => {
		if(account_id !== req.account?.account_id) throw new Error('You are not authorized to delete this post');
	})
	.then(() => Query(deleteQuery, [req.params.post_id]))
	.then(() => res.status(204).json({ message: 'Succesfully deleted post!' }))
	.catch(error => {
		console.error(error);
		res.status(500).json({ message: 'Failed to delete post' })
	});
}