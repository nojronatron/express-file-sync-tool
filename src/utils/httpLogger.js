import timeStamper from './timestamper.js';

export default function httpLogger(req, res, next) {
  console.log('~~~~~~~~~~');
  console.log('request properties called at timestamp:', timeStamper());
  console.log('originalUrl:', req.originalUrl);
  console.log('path:', req.path);
  console.log('baseUrl:', req.baseUrl);
  console.log('body:', req.body);
  console.log('hostname:', req.hostname);
  console.log('ip:', req.ip);
  console.log('method:', req.method);
  console.log('protocol:', req.protocol);
  console.log('query:', req.query);
  console.log('subdomains:', req.subdomains);
  console.log('header x-requested-with included?', req.xhr);
  console.log('~~~~~~~~~~\n');
  next();
}
