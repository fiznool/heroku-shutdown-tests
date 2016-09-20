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
