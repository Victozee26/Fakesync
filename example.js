// Example usage of fakesync package

const fakesync = require('./index');

// Set global default options (optional)
// This sets defaults that can be overridden per register call
fakesync.registerDefaults({
  minDelay: 100,  // minimum delay in ms
  maxDelay: 1000, // maximum delay in ms
  failRate: 0.1   // 10% chance of failure
});

// Define some functions to wrap
function syncFunc(x) {
  console.log(`syncFunc called with ${x}`);
  return x * 2;
}

async function asyncFunc(x) {
  console.log(`asyncFunc called with ${x}`);
  // Simulate some async work
  return new Promise(resolve => {
    setTimeout(() => resolve(x + 10), 50);
  });
}

// Register the functions with fakesync
// Options here will override defaults
fakesync.register({
  syncFunc,
  asyncFunc
}, {
  // Override defaults for these functions
  minDelay: 200,
  maxDelay: 800,
  failRate: 0.2  // 20% chance of failure
});

// Now use the wrapped functions
(async () => {
  console.log('Testing sync function:');
  try {
    const result1 = await fakesync.syncFunc(5);
    console.log('syncFunc result:', result1);
  } catch (e) {
    console.log('syncFunc failed:', e.message);
  }

  console.log('\nTesting async function:');
  try {
    const result2 = await fakesync.asyncFunc(5);
    console.log('asyncFunc result:', result2);
  } catch (e) {
    console.log('asyncFunc failed:', e.message);
  }

  console.log('\nRun this script multiple times to see simulated delays and failures.');
})();