'use strict';

const cluster = require('cluster');


if(cluster.isMaster) {
  let isActive = true;

  cluster.fork();
  cluster.fork();

  // Respawn any child processes that die
  cluster.on('exit', function() {
    if(isActive) {
      console.log('process died. restarting...');
      cluster.fork();
    }
  });

  const deactivateMasterProcess = function() {
  if(isActive) {
    isActive = false;

    const checkWorkers = function() {
      if(Object.keys(cluster.workers).length === 0) {
        console.log('Workers disconnected, exiting.');
        process.exit(0);
      }
    };

    console.log('Waiting for workers to disconnect...');

    checkWorkers();
    cluster.on('exit', checkWorkers);
    cluster.on('disconnect', checkWorkers);
  }
};

process.on('SIGINT', deactivateMasterProcess);
process.on('SIGTERM', deactivateMasterProcess);

} else {
  require('./index.js')();
}
