import { Request, Response, json } from "express";
import { validationResult } from "express-validator";
import { OkPacket } from "mysql";
import { v4 as uuidv4 } from "uuid";

import { Query, pool } from "../util/db";
import formatErrors from "../util/formatErrors";
import { getBlobClient } from "../util/storage";

export async function CreateBusinessPost(req: Request, res: Response) {
  // Validates body of request to make sure it is following validation rules
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(formatErrors(errors));
  }

  // Gets the account ID from the request body
  const { account } = req;
  if (account === undefined) return res.status(500);

  const postQuery =
    "INSERT INTO `posts` (`account_id`, `location_name`, `location_lat`, `location_long`, `caption`, `businessState`, `businessScheduleTime`, `created_at`, `updated_at`, `categories`) VALUES ( ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)";
  const imageQuery = `INSERT INTO post_images (post_id, image_url) VALUES (?, ?)`;

  const { ENVIRONMENT } = process.env;
  // Get the data from the request body
  const { picture, caption, location, businessState, dateTime, categories } =
    req.body;

  // uuidv4() generates a random string for the blob name
  const pictureName = uuidv4();
  const pictureBuffer = Buffer.from(picture, "base64");

  const lognitude = 0.1;
  const latitude = 0.1;

  try {
    // Upload the picture to the blob client
    getBlobClient()
      .getContainerClient(ENVIRONMENT!)
      .getBlockBlobClient(pictureName)
      .upload(pictureBuffer, pictureBuffer.length);

    // Create the post in the database
    let post = (await Query(postQuery, [
      account.account_id,
      location,
      lognitude,
      latitude,
      caption,
      businessState,
      dateTime,
      categories,
    ])) as any;

    // Updates the post with the picture url
    await Query(imageQuery, [
      post.insertId,
      `https://asdbackend.blob.core.windows.net/${ENVIRONMENT}/${pictureName}`,
    ]);

    // Return the post
    return res.status(201).json({ message: "Succesfully created post!" });
  } catch (ex) {
    // If there is an error, return the error
    return res.status(500).json({ message: "Failed to create post" });
  }
}

export async function UpdateBusinessPost(req: Request, res: Response) {
  // Validates body of request to make sure it is following validation rules
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(formatErrors(errors));
  }

  // Gets the account ID from the request body
  const { account } = req;
  if (account === undefined) return res.status(500);

  const updateBusinessPostQuery =
    "UPDATE `posts` SET `caption` = ?, `location_name` = ?, `updated_at` = NOW(), `businessState` = ?, `businessScheduleTime` = ?, `categories` = ? WHERE `post_id` = ?";
  const updateBusinessPostQueryNoDateTime =
    "UPDATE `posts` SET `caption` = ?, `location_name` = ?, `updated_at` = NOW(), `businessState` = ?, `categories` = ? WHERE `post_id` = ?";

  const post_id = req.params.post_id;

  const {
    caption,
    location,
    businessState,
    dateTime = null,
    categories = null,
  } = req.body;

  try {
    // If it's a scheduled post we need to update the date time
    if (dateTime) {
      await Query(updateBusinessPostQuery, [
        caption,
        location,
        businessState,
        dateTime,
        categories,
        post_id,
      ]);
      // If it's not a scheduled post we don't need to update the date time
    } else {
      await Query(updateBusinessPostQueryNoDateTime, [
        caption,
        location,
        businessState,
        categories,
        post_id,
      ]);
    }

    // Return the updated post
    return res.status(201).json({ message: "Successfully updated post! " });
  } catch (ex) {
    // Error if query fails
    console.log(ex);
    res.status(500).json({ message: "Failed to update post" });
  }
}
