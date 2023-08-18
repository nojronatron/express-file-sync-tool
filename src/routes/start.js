import processFileData from '../utils/processFileData.js';
import Watcher from 'watcher';

function start(watcher) {
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

  const filePath = process.env.FILE_PATH;
  watcher = new Watcher(filePath, watcherOptions);

  watcher.on('error', (err) => {
    console.error('Error:', err);
  });
  watcher.on('ready', () => {
    console.log('File watcher ready.');
  });
  watcher.on('close', () => {
    console.log('File watcher closed.');
  });
  watcher.on('add', (filePath) => {
    console.log('File added:', filePath);
    // todo: call function to process file
    processFileData(filePath);
  });
  watcher.on('unlink', (filePath) => {
    console.log('File removed:', filePath, 'no action taken.');
  });
}

export default start;
