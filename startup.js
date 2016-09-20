'use strict';

const cluster = require('cluster');
let active = true;

if(cluster.isMaster) {
  cluster.fork();
  cluster.fork();

  cluster.on('exit', () => {
    console.log('worker exited');
    if(active) {
      console.log('forking again...');
      cluster.fork();
    } else {
      const workersRemaining = Object.keys(cluster.workers).length;
      if(workersRemaining === 0) {
        console.log('Goodbye!');
        process.exit(0);
      }
    }
  });

  const shutdown = () => {
    console.log('Shutting down...');
    active = false;
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

} else {
  require('./index.js');
}
