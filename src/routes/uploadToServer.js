// function accepts an array of data and transmits to the defined server using axios
import axios from 'axios';
import processLogger from '../utils/processLogger.js';
import 'dotenv/config';

async function uploadToServer(data) {
  processLogger('uploadToServer called with array:', data);
  const url = process.env.SERVER_URL;
  const port = process.env.SERVER_PORT;
  const response = await axios.post(`${url}:${port}/upload`, data);
  processLogger('Response data from server:', response.data);
  processLogger('Upload status:', 'Completed.');
}

export default uploadToServer;
