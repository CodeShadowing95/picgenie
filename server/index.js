import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';

/* `dotenv.config();` loads environment variables from a `.env` file into `process.env`. This allows
sensitive information such as API keys, database credentials, and other configuration options to be
stored separately from the code and kept private. */
dotenv.config();

/* `const app = express();` creates an instance of the Express application. This instance is used to
define routes, middleware, and other functionalities of the web application. */
const app = express();

/* `app.use(cors());` is enabling Cross-Origin Resource Sharing (CORS) for the Express application.
CORS is a security feature implemented by web browsers that restricts web pages from making requests
to a different domain than the one that served the web page. By enabling CORS, the Express
application is allowing requests from other domains to access its resources. This is useful when
building web APIs that need to be accessed by clients running on different domains. */
app.use(cors());

/* `app.use(express.json({ limit: '50mb' }));` is setting up middleware in the Express application to
parse incoming requests with JSON payloads. The `express.json()` middleware parses the JSON payload
of the request and populates the `req.body` property with the parsed data. The `{ limit: '50mb' }`
option sets the maximum size of the JSON payload that can be parsed to 50 megabytes. This is useful
when dealing with large JSON payloads, such as when uploading files or sending large amounts of
data. */
app.use(express.json({ limit: '50mb' }));

/* `app.get('/', async (req, res) => { res.send('Hello World!'); })` is defining a route for the
Express application. The route is set up to handle GET requests to the root URL of the application
(`'/'`). When a GET request is made to the root URL, the callback function defined with `async (req,
res) => { res.send('Hello World!'); }` is executed. This function sends the string `'Hello World!'`
as the response to the client making the request. */
app.get('/', async (req, res) => {
  res.send('Hello from DALL-E!');
});

/**
 * This function starts a server on port 8080 and logs a message to the console indicating that the
 * server has started.
 */
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
  
}

startServer();