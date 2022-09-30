import { json, Request, Response } from 'express'
import { Query } from '../db'
import { validationResult } from 'express-validator'
import formatErrors from '../util/formatErrors'
import { getBlobClient } from '../storage'

const postQuery =
	'\
	INSERT INTO `posts` (`account_id`, `location_name`, `location_lat`, `location_long`, `caption`, `created_at`, `updated_at`) VALUES ( ?, ?, ?, ?, ?, NOW(), NOW() ) \
'

const { ENVIRONMENT } = process.env

async function Post(req: Request, res: Response) {
	const blobBlockClient = getBlobClient()
		.getContainerClient(ENVIRONMENT as string)
		.getBlockBlobClient('test.jpg')
	const uploadResponse = await blobBlockClient.uploadFile('test.jpg')

	res
		.status(200)
		.json({
			url: `https://asdbackend.blob.core.windows.net/${ENVIRONMENT}/test.jpg`,
			response: uploadResponse,
		})
	/*const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(formatErrors(errors))
	}

	const { picture, caption, location } = req.body

	try {
		await Query(postQuery, [1, location, 0.1, 0.1, caption])

		return res.status(201).json({
			message: 'Succesfully created post!',
		})
	} catch {
		return res.status(400).json({ message: 'Failed to create post' })
	}*/
}

export { Post }
