import timeStamper from './timestamper.js';

export default function processLogger(arg1, arg2) {
  const timeStamp = timeStamper();
  console.log('~~~~~~~~~~');
  console.log(
    'processLogger called at',
    timeStamp,
    'arg1:',
    arg1,
    'arg2:',
    arg2
  );
  console.log('~~~~~~~~~~\n');
}
