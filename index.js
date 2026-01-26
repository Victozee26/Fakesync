// fasync: A package to wrap functions and make them behave like fake async functions
// with configurable delay and failure rate.

const fasync = {
  // Store global default options
  defaults: {},

  // Set global default options that will be used if not overridden in register
  registerDefaults(options) {
    this.defaults = { ...this.defaults, ...options };
  },

  // Register functions to be wrapped as fake async
  // funcs: object with function names as keys and functions as values
  // options: { minDelay, maxDelay, failRate }
  register(funcs, options = {}) {
    // Merge defaults with provided options
    const opts = { ...this.defaults, ...options };
    const { minDelay = 0, maxDelay = 500, failRate = 0 } = opts;

    // For each function, create a wrapped version that returns a Promise
    for (const [name, func] of Object.entries(funcs)) {
      this[name] = (...args) => {
        return new Promise((resolve, reject) => {
          // Calculate random delay between minDelay and maxDelay
          const delay = Math.random() * (maxDelay - minDelay) + minDelay;

          // Wait for the delay, then execute the function
          setTimeout(() => {
            // Check if we should simulate a failure
            if (Math.random() < failRate) {
              reject(new Error('Simulated failure'));
            } else {
              try {
                // Call the original function
                const result = func(...args);

                // If the result is a Promise (async function), wait for it
                if (result instanceof Promise) {
                  result.then(resolve).catch(reject);
                } else {
                  // Otherwise, resolve immediately with the result
                  resolve(result);
                }
              } catch (e) {
                // If the function throws synchronously, reject
                reject(e);
              }
            }
          }, delay);
        });
      };
    }
  }
};

module.exports = fasync;