'use strict';

console.log('Started');

let active = true;

const shutdown = function() {
  console.log('Received shutdown signal');
  active = false;
  process.on('TICK', () => {
    console.log('Shutting down.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const tick = function() {
  setTimeout(() => {
    console.log('tick');
    process.emit('TICK');
    if(active) {
      tick();
    }
  }, 5000);

};

tick();
