'use strict';

const cluster = require('cluster');
const winston = require('winston');

let active = true;

if(cluster.isMaster) {
  cluster.fork();
  cluster.fork();

  cluster.on('exit', () => {
    winston.info('worker exited');
    if(active) {
      winston.info('forking again...');
      cluster.fork();
    } else {
      const workersRemaining = Object.keys(cluster.workers).length;
      if(workersRemaining === 0) {
        winston.info('Goodbye!');
        process.exit(0);
      }
    }
  });

  const shutdown = () => {
    winston.info('Shutting down...');
    active = false;
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

} else {
  require('./index.js');
}
