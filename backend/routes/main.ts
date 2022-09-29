import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import express, { Request, Response, Router } from 'express'

import { blobServiceClient, database } from '../app'
import { hello } from './hello'
import { index } from './index'

const router = Router()

router.get('/', index)
router.get('/hello/:name', hello)

router.post('/posts', (_req: Request, res: Response) => {
	const req = _req as Request & { files: Record<string, unknown> };

	const { picture, caption, location }: { picture: unknown, caption: string, location: string } = { ...req.body, ...req.files };

	if(!picture || !caption || !location) return res.send('missing fields')

	// see who is logged in (check cookies / token)

	// 0. extract gps coordinates from the picture

	// 1. create a post

	database.query("INSERT INTO `posts` (`account_id`, `location_name`, `location_lat`, `location_long`, `caption`, `created_at`, `updated_at`) VALUES ( :account_id, :location_name, :location_lat, :location_long, :caption, NOW(), NOW() );", {
		account_id: 1,
		location_name: location,
		location_lat: 0.1,
		location_long: 0.1,
		caption,
	}, async (err, result) => {

		if(err) {
			console.log(err)
			return res.send('error')
		}


		console.log("Available containers")
		for await (const container of blobServiceClient.listContainers()) {
			console.log(`Container: ${container.name}`);
		}

		/*
		const containerClient = blobServiceClient.getContainerClient("<container name>");

		const picture = Buffer.from([]);
		const picture_name = "name of the picture";

		const blockBlobClient = containerClient.getBlockBlobClient(picture_name);
		const uploadBlobResponse = await blockBlobClient.upload(picture, picture.length);

		console.log(`Upload block blob ${picture_name} successfully`, uploadBlobResponse.requestId);
		*/

		    /**
			 * User can select a file ✅
			 * User previews the file ❌
			 * User sends the form ✅❌
			 * The server recieves the request ✅
			 * The server connects to the database ✅
			 * The server upload the picture to the bucket ❌
			 * The server stores the post_image_url in the database ❌
			 * The server stores the post in the database ❌
			 * The server responds that everything went well ❌
			 */
		
		// 2 upload picture to the bucket and get the url back?
	
		// 3. create a post_image
		res.send('ok')
	});
	
})

export default router

