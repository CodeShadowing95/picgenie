import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

// If our environment variables are well populated
dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.send('Let\'s go DALL-E!');
})

router.route('/').post(async (req, res) => {
  try {
    // Get the prompt from the form in frontend
    const { prompt } = req.body;

    // Generate the image from the prompt with openai
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    // Get the image generated from backend
    const image = aiResponse.data.data[0].b64_json;

    // Send the image to the frontend
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
})

export default router;