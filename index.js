'use strict';

const uid = Date.now();
const log = function(msg) {
  console.log(uid + ': ' + msg);
};

log('Started');

// Start a web server so that heroku is happy
var app = require('express')();
app.get('/', function(req, res) {
  log('Accepted Connection');
  setTimeout(() => {
    log('Writing Response');
    res.send([
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '<title>Hello World Page</title>',
      '</head>',
      '<body>',
      'Hello World!',
      '</body>',
      '</html>'
    ].join(''));
  }, 10000);
});

const server = app.listen(process.env.PORT || 5000, () => {
  log('Server is listening');
});

const shutdown = function() {
  log('Received shutdown signal');
  server.close(() => {
    log('Shutting down.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
