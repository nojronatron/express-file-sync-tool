import express from 'express';
const server = express();
import Watcher from 'watcher';

import start from './routes/start.js';
import httpLogger from './utils/httpLogger.js';

import 'dotenv/config';

var watcher = new Watcher();
const PORT = process.env.PORT || 6002;
server.use(httpLogger);

server.get('/', (req, res, next) => {
  res.send('Server is running.');
});

server.get('/start', (req, res, next) => {
  start(watcher);
  res.send('File watcher started.');
});

server.get('/stop', (req, res, next) => {
  watcher.close();
  res.send('File watcher stopped.');
});

server.post('/upload', (req, res, next) => {
  res.send('ok');
});

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
