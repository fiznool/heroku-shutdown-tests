'use strict';

console.log('Started');

let active = true;

const shutdown = function() {
  console.log('Shutting down.');
  active = false;
  process.on('TICK', () => process.exit(0));
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
  }, 1000);

};

tick();
