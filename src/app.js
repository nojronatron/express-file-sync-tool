import express from 'express';
const server = express();
import Watcher from 'watcher';
import 'dotenv/config';

const filePath = process.env.FILE_PATH;
const watcherOptions = {
  debounce: 300,
  depth: 1,
  limit: 10,
  ignoreInitial: false,
  native: true,
  persistent: true,
  pollingInterval: 3000,
  pollingTimeout: 20000,
  recursive: false,
  renameDetection: false,
  renameTimeout: 1250,
};

var watcher = new Watcher();
const PORT = process.env.PORT || 6002;

server.get('/', (req, res, next) => {
  res.send('Server is running.');
});
