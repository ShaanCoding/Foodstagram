import { Request, Response, json } from 'express'
import { validationResult } from 'express-validator'
import { OkPacket } from "mysql";
import { v4 as uuidv4 } from "uuid";

import { Query, pool } from '../util/db'
import formatErrors from '../util/formatErrors'
import { getBlobClient } from '../util/storage'

export async function CreatePost(req: Request, res: Response) {
	const postQuery = 'INSERT INTO posts (account_id, location_name, location_lat, location_long, caption, created_at, updated_at) VALUES ( ?, ?, ?, ?, ?, NOW(), NOW() )';
	const postImagesQuery = `INSERT INTO post_images (post_id, image_url) VALUES ?`;
	
	const { ENVIRONMENT } = process.env;
	
	const { picture, caption, location } = req.body;

	const lognitude = 0.1;
	const latitude = 0.1;

	Promise
	.resolve()
	.then(() => validationResult(req)) // Validate the incoming http request
	.then((errors) => {
		if (!errors.isEmpty()) throw formatErrors(errors);
	})
	.then(() => Promise.all( // 1. upload the pictures to blob client -> picture urls (used in step 3)
		picture
			.map((pic: string) => {
				const pictureName = uuidv4();
				const pictureBuffer = Buffer.from(pic, 'base64');
				return Promise
				.resolve()
				.then(() => getBlobClient().getContainerClient(ENVIRONMENT!).getBlockBlobClient(pictureName)) // get the container
				.then(blobBlockClient => blobBlockClient.upload(pictureBuffer, pictureBuffer.length)) // upload the file to the container
				.then(_ => `https://asdbackend.blob.core.windows.net/${ENVIRONMENT}/${pictureName}`)
			})
		)
	)
	.then(pictureUrls => Promise.all([ // 2. insert the post -> post id (step 4) + picture urls
		pictureUrls,
		pool.promise().execute(postQuery, [req.account!.account_id, location, lognitude, latitude, caption]).then(([o, _]) =>(o as unknown as OkPacket).insertId)
	]))
	.then(([pictureUrls, insertId]) => Promise.all([ // 3. insert the pictures (picture urls + post id) -> post id
		insertId,
		pool.promise().query(postImagesQuery, [ pictureUrls.map((url: string) => [insertId, url]) ])
	]))
	.then(([inserted_id]) => res.status(201).json({ message: 'Succesfully created post!', inserted_id })) // 4. return the post id
	.catch(error => {
		console.error(error);
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

// TODO delete cascade pictures when we delete a post
export async function DeletePost(req: Request, res: Response) {
	const getUserIdQuery = 'SELECT account_id FROM posts WHERE post_id = ?;';
	const deleteLikedPostQuery = 'DELETE FROM liked_posts WHERE post_id = ?;';
	const deleteQuery = "DELETE FROM posts WHERE post_id = ?;";

	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json(formatErrors(errors));
	
	try {
		let data = await Query(getUserIdQuery, [req.params.post_id]) as { account_id: number }[];
		
		if(data[0].account_id !== req.account?.account_id) {
			return res.status(400).json({ message: 'You are not authorized to delete this post' });
		}
	
		if(!data.length) {
			return res.status(400).json({ message: 'Post does not exist' });
		}
	
		await Query(deleteLikedPostQuery, [req.params.post_id]) ;
		await Query(deleteQuery, [req.params.post_id]) ;
	
		res.status(204).json({ message: 'Succesfully deleted post!' });
	} catch(ex) {
		console.error(ex);
		res.status(500).json({ message: 'Failed to delete post' });
	}
}