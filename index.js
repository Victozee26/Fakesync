// fakesync: A package to wrap functions and make them behave like fake async functions
// with configurable delay and failure rate.

/**
 * @typedef {import('./index.d').FakeSyncOptions} FakeSyncOptions
 * @typedef {import('./index.d').FakeSyncFunctions} FakeSyncFunctions
 */

/**
 * Main fakesync object. Annotated with the d.ts types so TypeScript/ESLint
 * pick up that dynamically registered functions exist and return Promises.
 * @type {import('./index.d').FakeSync}
 */
const fakesync = {
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

    // For each function, create a wrapped async version that always returns a Promise
    for (const [name, func] of Object.entries(funcs)) {
      /**
       * Wrapped function that resolves after a random delay and may fail
       * @param  {...any} args
       * @returns {Promise<any>}
       */
      this[name] = async (...args) => {
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;

        // Wait for the random delay
        await new Promise((res) => setTimeout(res, delay));

        // Simulate failure based on failRate
        if (Math.random() < failRate) {
          throw new Error('Simulated failure');
        }

        // Execute the original function; if it returns a promise we await it
        try {
          const result = func(...args);
          return await result;
        } catch (e) {
          throw e;
        }
      };
    }
  }
};

module.exports = fakesync;