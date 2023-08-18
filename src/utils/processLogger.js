import timeStamper from './timestamper.js';

export default function processLogger(arg1, arg2) {
  const timeStamp = timeStamper();
  console.log('~~~~~~~~~~');
  console.log(
    'processLogger called at',
    timeStamp,
    'with the following data:',
    arg1,
    ',',
    arg2
  );
  console.log('~~~~~~~~~~\n');
}
