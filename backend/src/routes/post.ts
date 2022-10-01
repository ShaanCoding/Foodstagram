import { Request, Response, json } from 'express'
import { validationResult } from 'express-validator'
import { OkPacket } from "mysql";
import { v4 as uuidv4 } from "uuid";

import { Query, pool } from '../util/db'
import formatErrors from '../util/formatErrors'
import { getBlobClient } from '../util/storage'

const postQuery = 'INSERT INTO `posts` (`account_id`, `location_name`, `location_lat`, `location_long`, `caption`, `created_at`, `updated_at`) VALUES ( ?, ?, ?, ?, ?, NOW(), NOW() )';
const potImagesQuery = 'INSERT INTO post_images ( post_id, image_url ) VALUES ( ?, ? )';


export async function Post(req: Request, res: Response) {
	
	const { ENVIRONMENT } = process.env;
	const { picture, caption, location } = req.body;
	const pictureName = `${uuidv4()}`;

	Promise
	.resolve()
	.then(() => validationResult(req)) // Validate the incoming http request
	.then((errors) => {
		if (!errors.isEmpty()) throw formatErrors(errors);
	})
	.then(() => getBlobClient().getContainerClient(ENVIRONMENT!).getBlockBlobClient(pictureName)) // get the container
	.then(blobBlockClient => blobBlockClient.upload(picture, picture.length)) // upload the file to the container
	.then(uploadResponse => pool.promise().execute(postQuery, [1, location, 0.1, 0.1, caption]).then(([ok, _]) => (ok as unknown as OkPacket).insertId) ) // insert the post into the database // Query(postQuery, [1, location, 0.1, 0.1, caption])
	.then(postId => Query(potImagesQuery, [postId + "", `https://asdbackend.blob.core.windows.net/${ENVIRONMENT}/${pictureName}`])) // insert the post_image into the database
	.then(() => res.status(201).json({ message: 'Succesfully created post!' }))
	.catch(error => {
		console.log(error);
		res.status(500).json({ message: 'Failed to create post' })
	});
}
