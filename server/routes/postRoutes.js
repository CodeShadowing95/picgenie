import express from 'express';
import * as dotenv from 'dotenv';
// Host our images, so we can retrieve them all once we submit them
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

// If our environment variables are well populated
dotenv.config();

/* `const router = express.Router();` is creating a new router object from the Express.js framework.
This router object can be used to define routes for handling HTTP requests. */
const router = express.Router();

/* `cloudinary.config()` is configuring the Cloudinary API with the credentials needed to access the
Cloudinary server. The `cloud_name`, `api_key`, and `api_secret` properties are set to the values
stored in the environment variables `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and
`CLOUDINARY_API_SECRET`, respectively. These environment variables are used to keep sensitive
information, such as API keys and secrets, out of the codebase and are typically stored in a `.env`
file. */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all the posts
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});

    /* `res.status(200).json({ success: true, data: posts });` is sending an HTTP response with a
    status code of 200 (OK) and a JSON object as the response body. The JSON object contains two
    properties: `success` and `data`. The `success` property is set to `true` to indicate that the
    request was successful, and the `data` property contains an array of `posts` retrieved from the
    database. */
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// Create a post
router.route('/').post( async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    /* `const photoUrl = await cloudinary.uploader.upload(photo);` is uploading an image file to the
    Cloudinary server using the `cloudinary` library and returning the URL of the uploaded image.
    The `photo` parameter is the image file that is being uploaded. The returned `photoUrl` is then
    used to store the URL of the uploaded image in the database. */
    const photoUrl = await cloudinary.uploader.upload(photo);

    /* `const newPost = await Post.create({ name, prompt, photo: photoUrl.url })` is creating a new
    post in the database using the `Post` model. The `name`, `prompt`, and `photo` properties of the
    new post are set to the values passed in the `req.body` object, with the `photo` property being
    set to the URL of the uploaded image returned by Cloudinary. The `await` keyword is used to wait
    for the `create` method to finish executing before assigning the result to the `newPost`
    variable. */
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    /* `res.status(201).json({ success: true, data: newPost });` is sending an HTTP response with a
    status code of 201 (Created) and a JSON object as the response body. The JSON object contains
    two properties: `success` and `data`. The `success` property is set to `true` to indicate that
    the request was successful, and the `data` property contains the newly created post object
    returned by the database. */
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    /* `res.status(500).json({ success: false, message: error });` is sending an HTTP response with a
    status code of 500 (Internal Server Error) and a JSON object as the response body. */
    res.status(500).json({ success: false, message: error });
  }
})

export default router;
