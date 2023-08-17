function logger(req, res, next) {
  console.log('request baseUrl', req.baseUrl);
  console.log('request body', req.body);
  console.log('request hostname', req.hostname);
  console.log('request ip', req.ip);
  console.log('request method', req.method);
  console.log('request originalUrl', req.originalUrl);
  console.log('request path', req.path);
  console.log('request protocol', req.protocol);
  console.log('request query', req.query);
  console.log('request subdomains', req.subdomains);
  console.log('header x-requested-with included?', req.xhr);
  next();
}

module.exports = logger;
