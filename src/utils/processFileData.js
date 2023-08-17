import fs from 'fs';
import path from 'path';
import processLogger from './processLogger.js';
import 'dotenv/config';

async function processFileData(filePath) {
  processLogger('processFileData called with argument:', filePath);

  if (filePath === undefined) {
    processLogger('filePath is undefined.', '');
    return;
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      nextTick(err);
    } else {
      processLogger('read file data:\n', data);
      const result = data.match(
        /\d{1,3}\t(OUT|IN|DROP)\t\d{4}\t\d{1,2}\t\w{2}/g
      );

      if (result === null) {
        processLogger('no data match result', '');
        return;
      } else {
        processLogger('data match result', result);
      }

      const outputFile = path.join(
        process.env.BIB_DATA_PATH,
        'raw_bib_data.txt'
      );
      processLogger('outputFile path', outputFile);

      // iterate through result array and write each string element to a file using fs
      result.forEach((element) => {
        fs.appendFile(outputFile, element + '\n', (err) => {
          if (err) {
            console.error('Error writing to file:', err);
            nextTick(err);
          } else {
            processLogger(element, 'successfully written to file');
          }
        });
      });
    }
  });
}

export default processFileData;
