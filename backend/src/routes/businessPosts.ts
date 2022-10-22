import { Request, Response, json } from "express";
import { validationResult } from "express-validator";
import { OkPacket } from "mysql";
import { v4 as uuidv4 } from "uuid";

import { Query, pool } from "../util/db";
import formatErrors from "../util/formatErrors";
import { getBlobClient } from "../util/storage";

export async function CreateBusinessPost(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(formatErrors(errors));
  }

  const postQuery =
    "INSERT INTO `posts` (`account_id`, `location_name`, `location_lat`, `location_long`, `caption`, `businessState`, `businessScheduleTime`, `created_at`, `updated_at`, `categories`) VALUES ( ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)";

  const imageQuery = `INSERT INTO post_images (post_id, image_url) VALUES (?, ?)`;

  const { ENVIRONMENT } = process.env;
  const {
    picture,
    caption,
    location,
    businessState,
    dateTime,
    account_id,
    categories,
  } = req.body;

  const pictureName = uuidv4();
  const pictureBuffer = Buffer.from(picture, "base64");

  const lognitude = 0.1;
  const latitude = 0.1;

  validationResult(req).throw();

  try {
    getBlobClient()
      .getContainerClient(ENVIRONMENT!)
      .getBlockBlobClient(pictureName)
      .upload(pictureBuffer, pictureBuffer.length);

    let post = (await Query(postQuery, [
      account_id ? account_id : 1,
      location,
      lognitude,
      latitude,
      caption,
      businessState,
      dateTime,
      categories,
    ])) as any;

    console.log(post.insertId);

    await Query(imageQuery, [
      post.insertId,
      `https://asdbackend.blob.core.windows.net/${ENVIRONMENT}/${pictureName}`,
    ]);

    return res.status(201).json({ message: "Succesfully created post!" });
  } catch (ex) {
    return res.status(500).json({ message: "Failed to create post" });
  }
}

export async function UpdateBusinessPost(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(formatErrors(errors));
  }

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
    if (dateTime) {
      await Query(updateBusinessPostQuery, [
        caption,
        location,
        businessState,
        dateTime,
        categories,
        post_id,
      ]);
    } else {
      let update = await Query(updateBusinessPostQueryNoDateTime, [
        caption,
        location,
        businessState,
        categories,
        post_id,
      ]);
      console.log(update);
    }

    return res.status(201).json({ message: "Successfully updated post! " });
  } catch (ex) {
    console.log(ex);
    res.status(500).json({ message: "Failed to update post" });
  }
}
