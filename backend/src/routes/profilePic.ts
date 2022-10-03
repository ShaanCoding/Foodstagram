import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { v4 as uuidv4 } from "uuid";

import { Query } from '../util/db'
import formatErrors from '../util/formatErrors'
import { getBlobClient } from '../util/storage'

export async function ProfilePic(req: Request, res: Response) {

    const profilePicQuery = `
    UPDATE accounts
    SET profile_picture_url = ?
    WHERE account_id = ?
    `
    const { ENVIRONMENT } = process.env;
    const { picture } = req.body;

    const pictureName = uuidv4();
    const pictureBuffer = Buffer.from(picture, 'base64');

    Promise
        .resolve()
        .then(() => validationResult(req)) // Validate the incoming http request
        .then((errors) => {
            if (!errors.isEmpty()) throw formatErrors(errors);
        })
        .then(() => getBlobClient().getContainerClient(ENVIRONMENT!).getBlockBlobClient(pictureName)) // get the container
        .then(blobBlockClient => blobBlockClient.upload(pictureBuffer, pictureBuffer.length)) // upload the file to the container
        .then(uploadResponse => Query(profilePicQuery, [`https://asdbackend.blob.core.windows.net/${ENVIRONMENT}/${pictureName}`, req.params.profileID]))
        .then(() => res.status(201).json({ message: 'Successfully updated profile picture!' }))
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'Failed to updated profile picture' })
        });
}