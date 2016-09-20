'use strict';

const uid = Date.now();
const log = function(msg) {
  console.log(uid + ': ' + msg);
};

log('Started');

// Start a web server so that heroku is happy
var http = require('http');
var server = http.createServer(function(request, response) {
  log('Accepted Connection');
  setTimeout(() => {
    log('Writing Response');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<!DOCTYPE html>');
    response.write('<html>');
    response.write('<head>');
    response.write('<title>Hello World Page</title>');
    response.write('</head>');
    response.write('<body>');
    response.write('Hello World!');
    response.write('</body>');
    response.write('</html>');
    response.end();
  }, 20000);
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

server.listen(process.env.PORT || 5000);
log('Server is listening');
