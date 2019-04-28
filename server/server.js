'use strict'

import CONSTANTS from '../constants';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

// Import routes
import athena from './routes/athena.routes';
import user from './routes/user.routes';
import profile from './routes/profile.routes';
import image from './routes/image.routes';

// Import mock data
import createMockUsers from './__mocks__/user.mock';
import createMockProfiles from './__mocks__/profile.mock';

// Child Process to call python
import { PythonShell } from 'python-shell';
import * as child from 'child_process';

// Initialize the Express App
const app = express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// env variables
const PORT = CONSTANTS.express.port;
const MONGODB_URI = CONSTANTS.mongodb_uri;

/* Mongo isn't needed yet */
// MongoDB Connection
// mongoose.Promise = Promise;
// if (process.env.NODE_ENV !== 'test') {
//     mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (error) => {
//         if (error) {
//         console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
//         throw error;
//         }

//         // feed some mock data in DB.
//         createMockUsers();
//         createMockProfiles();
//     });
// }

/* log all requests to console */
app.use(morgan('dev'));

/* Point static path to dist */
app.use(express.static(CONSTANTS.webapp.dist));

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
// app.use(require('../routes/auth-router'));

// Mount public API routers
app.use('/api', user);
app.use('/api', profile);
app.use('/api/athena', athena);
app.use('/api/images', image);

/* Catch all other routes and return the index file */
app.all('*', (request, response) => {
  return response.sendStatus(404);
});

// error middleware
// app.use(require('./error-middleware'));

/* If port is busy, kill node process via powershell */
// taskkill /F /IM node.exe

export const start = () => {
  app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`);
  });
};

export const stop = () => {
  app.close(PORT, () => {
    console.log(`Shut down on port: ${PORT}`);
  });
};