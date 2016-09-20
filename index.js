'use strict';

console.log('Started');

const shutdown = function() {
  console.log('Shutting down.');
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
