import express from 'express';
const server = express();
import Watcher from 'watcher';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

import httpLogger from './utils/httpLogger.js';
import start from './routes/start.js';
import timeStamper from './utils/timestamper.js';

import 'dotenv/config';
// import insertMany from './utils/dbManager.js';

var watcher = new Watcher();
const PORT = process.env.PORT || 6666;

const bpOptions = {
  inflate: true,
  limit: '100kb',
  strict: true,
  type: 'application/json',
};
const jsonParser = bodyParser.json(bpOptions);
server.use(httpLogger);

// Mongo connection setup
const mongoDbUrl = 'mongodb://localhost:27017'; // todo - move to .env
const mongoOptions = {
  monitorCommands: true,
};
const mongoDbClient = new MongoClient(mongoDbUrl, mongoOptions);
await mongoDbClient.connect();
console.log('Connected to MongoDB server.');

/* routes */
server.get('/', (req, res, next) => {
  res.send('Server is running.');
});

server.get('/start', (req, res, next) => {
  start(watcher);
  res.send('File watcher started.');
});

server.get('/stop', (req, res, next) => {
  watcher.close();
  try {
    mongoDbClient.close();
    console.log('MongoDB connection closed.');
  } catch (err) {
    console.log('Error closing MongoDB connection:', err);
  }
  res.send('Processes stopped.');
});

server.post('/upload', jsonParser, async (req, res, next) => {
  console.log('req.body', req.body);
  const dataCollection = req.body;
  let insertCount = 0;

  if (dataCollection.length <= 0) {
    console.log('No data to upload.');
    res.send('No data to upload.', insertCount, 'records added.');
    return;
  }

  const mongoDbName = 'WinlinkFormsDB'; // todo - move to .env
  const mongoDb = mongoDbClient.db(mongoDbName);
  const collectionName = 'bibdata-dev'; // todo - move to .env
  const mdbCollection = mongoDb.collection(collectionName);
  console.log('MongoDB collection', collectionName, 'configured.');

  dataCollection.forEach(async (element) => {
    const timeStamp = timeStamper();
    const firstEntryItems = element.split('\t');

    const firstBibInstance = {
      bibNum: firstEntryItems[0],
      bibAction: firstEntryItems[1],
      bibTime: firstEntryItems[2],
      bibDay: firstEntryItems[3],
      location: firstEntryItems[4],
      updated: timeStamp,
      isDeleted: false,
    };

    // use mdbCollection to find firstBibInstance
    const found = await mdbCollection.findOne({
      bibNum: firstBibInstance.bibNum,
      bibAction: firstBibInstance.bibAction,
      bibTime: firstBibInstance.bibTime,
      bibDay: firstBibInstance.bibDay,
      location: firstBibInstance.location,
    });

    // if firstBibInstance is not found then add it to the mdbCollection
    if (found === null || found === undefined) {
      console.log('inserting new element', firstBibInstance);
      const result = await mdbCollection.insertOne(firstBibInstance);
      console.log('insert result', result);
      insertCount++;
    } else {
      console.log('element', firstBibInstance, 'already exists');
    }
  });

  res.send('Upload completed. ' + insertCount + ' records inserted.');
});

/* end routes */

server.use((err, req, res, next) => {
  console.error('Error:', err);
  if (res.headersSent) {
    console.error(
      'Headers already send, cannot respond to client with current error.'
    );
  } else {
    res.status(500).send('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
