'use strict'

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

// Import routes
import user from './routes/user.routes';
import profile from './routes/profile.routes';

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
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/athena';


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

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }), cors());
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
// app.use(require('../routes/auth-router'));
app.use(express.static(path.resolve(__dirname, '../client/dist/')));

// Mount public API routers
app.use('/api', user);
app.use('/api', profile);

app.all('*', (request, response) => {
  console.log('Returning a 404 from the catch-all route');
  return response.sendStatus(404);
});

// call neural style transfer algorithm
const pathToChildProcess = path.resolve(__dirname, '../python/athena_package/neural_style_transfer_tf_eager.py');
let pythonChildProcessOptions = {
  mode: 'text',
  pythonOptions: ['-u'], // get print results in real-time
  parser: (message) => console.log('PYTHON MESSAGE: ', message),
  stderrParser: (stderr) => {
    console.log('====== PYTHON ERROR ===========');
    console.log(stderr);
    console.log('====== END PYTHON ERROR ===========');
  }
};
 
PythonShell.run(pathToChildProcess, pythonChildProcessOptions, (err, results) => {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  console.log('results: %j', results);
});

// error middleware
// app.use(require('./error-middleware'));

export const start = () => {
  app.listen(PORT, () =>{
    console.log(`Listening on port: ${PORT}`)
  })
}

export const stop = () => {
  app.close(PORT, () => {
    console.log(`Shut down on port: ${PORT}`)
  })
}