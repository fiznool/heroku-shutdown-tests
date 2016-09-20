'use strict';

const uid = Date.now();
const log = function(msg) {
  console.log(uid + ': ' + msg);
};

log('Started');

let active = true;

const shutdown = function() {
  log('Received shutdown signal');
  active = false;
  process.on('TICK', () => {
    log('Shutting down.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const tick = function() {
  setTimeout(() => {
    log('tick');
    process.emit('TICK');
    if(active) {
      tick();
    }
  }, 5000);

};

tick();

// Start a web server so that heroku is happy
var http = require('http');
var server = http.createServer(function(request, response) {
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
});

server.listen(process.env.PORT || 8080);
console.log('Server is listening');
